import { VoiceVoxRepository } from '../../dataSources/voiceVox/VoiceVoxRepository'
import { FirebaseStorageRepository } from '../../dataSources/firebase/storage/FirebaseStorageRepository'
import { dotEnvFirebaseStorage, dotEnvVoiceVox } from '../../dataSources/env/DotEnv'
import { VoiceVoxClient } from '../../dataSources/voiceVox/voiceVoxClient'
import { firebaseStorage } from '../../dataSources/firebase/firebase'
import path from 'path'
import { firebaseStorageZundamonMp3BasePath } from '../common/FirebaseStorageConst'

export class VoiceVoxUseCase {
  private voiceVoxRepository: VoiceVoxRepository
  private firebaseStorageRepository: FirebaseStorageRepository
  private storageBucketName: string

  constructor() {
    const env = dotEnvVoiceVox()
    this.voiceVoxRepository = new VoiceVoxRepository(new VoiceVoxClient(env.apiUrl, env.speakerId))
    this.firebaseStorageRepository = new FirebaseStorageRepository(firebaseStorage)
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
    try {
      const filePath = path.join(firebaseStorageZundamonMp3BasePath, `${speechText}.mp3`)
      console.log('VoiceVoxUseCase fetchSignedUrl()', speechText, filePath)

      const isAlreadyUploaded = await this.firebaseStorageRepository.isAlreadyUploaded(
        this.storageBucketName,
        filePath,
      )
      if (!isAlreadyUploaded) {
        const arrayBuffer = await this.voiceVoxRepository.generateVoice(speechText)
        console.log('VoiceVoxUseCase fetchSignedUrl() arrayBuffer', arrayBuffer.byteLength)

        await this.firebaseStorageRepository.uploadArrayBuffer(
          this.storageBucketName,
          filePath,
          arrayBuffer,
        )
      }

      return await this.firebaseStorageRepository.generateSignedUrl(
        this.storageBucketName,
        filePath,
      )
    } catch (e) {
      console.error(e)
      return ''
    }
  }
}
