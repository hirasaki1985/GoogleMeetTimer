import { VoiceVoxRepository } from '../../dataSources/voiceVox/VoiceVoxRepository'
import { FirebaseStorageRepository } from '../../dataSources/firebase/storage/FirebaseStorageRepository'
import { dotEnvFirebaseStorage, dotEnvVoiceVox } from '../../dataSources/env/DotEnv'
import { VoiceVoxClient } from '../../dataSources/voiceVox/voiceVoxClient'
import { firebaseDataBase, firebaseStorage } from '../../dataSources/firebase/firebase'
import path from 'path'
import { firebaseStorageZundamonMp3BasePath } from '../common/FirebaseStorageConst'
import { VoiceManagerSpeakerIds, VoiceManagerTextIds } from './VoiceManagerConst'
import { voiceManagerGetSpeechText } from './VoiceManagerHelper'
import { TimerRepository } from '../timer/TimerRepository'

/**
 * VoiceManagerUseCase
 */
export class VoiceManagerUseCase {
  private voiceVoxRepository: VoiceVoxRepository
  private firebaseStorageRepository: FirebaseStorageRepository
  private timerRepository: TimerRepository
  private storageBucketName: string

  constructor() {
    const env = dotEnvVoiceVox()
    this.voiceVoxRepository = new VoiceVoxRepository(new VoiceVoxClient(env.apiUrl, env.speakerId))
    this.firebaseStorageRepository = new FirebaseStorageRepository(firebaseStorage)
    this.timerRepository = new TimerRepository(firebaseDataBase)
    this.storageBucketName = dotEnvFirebaseStorage().bucketName
  }

  /**
   * 音声の認証付きURLを取得する。
   *
   * Storageにない場合はspeechTextを音声化してstorageにアップロードする
   * @param speechText 喋らせたい内容
   * @return 認証付きURL
   */
  public async fetchSignedUrl(speechText: string): Promise<string> {
    const filePath = path.join(firebaseStorageZundamonMp3BasePath, `${speechText}.mp3`)
    console.log('VoiceManagerUseCase fetchSignedUrl()', speechText, filePath)

    const isAlreadyUploaded = await this.firebaseStorageRepository.isAlreadyUploaded(
      this.storageBucketName,
      filePath,
    )
    if (!isAlreadyUploaded) {
      const arrayBuffer = await this.voiceVoxRepository.generateVoice(speechText)
      console.log('VoiceManagerUseCase fetchSignedUrl() arrayBuffer', arrayBuffer.byteLength)

      await this.firebaseStorageRepository.uploadArrayBuffer(
        this.storageBucketName,
        filePath,
        arrayBuffer,
      )
    }

    return await this.firebaseStorageRepository.generateSignedUrl(this.storageBucketName, filePath)
  }

  /**
   * 音声ファイルを最新の状態にする
   */
  public async fetchVoice(
    meetingId: string,
    textId: VoiceManagerTextIds,
    speakerId: VoiceManagerSpeakerIds = dotEnvVoiceVox().speakerId,
  ): Promise<boolean> {
    const speechText = voiceManagerGetSpeechText(textId, speakerId)
    console.log(
      'VoiceManagerUseCase fetchVoice() meetingId, textId, speakerId',
      meetingId,
      textId,
      speakerId,
    )
    if (speechText == null || speechText === '') {
      throw new Error('speechTextが空です')
    }

    const url = await this.fetchSignedUrl(speechText)
    if (url == null || speechText === '') {
      throw new Error('urlが空です')
    }

    console.log('VoiceManagerUseCase fetchVoice()  url', url)

    return await this.timerRepository.updateMp3FilePath(meetingId, textId, url)
  }
}
