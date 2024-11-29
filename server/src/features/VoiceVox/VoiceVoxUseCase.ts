import { VoiceVoxRepository } from '../../dataSources/voiceVox/VoiceVoxRepository'
import { FirebaseStorageRepository } from '../../dataSources/firebase/storage/FirebaseStorageRepository'
import { dotEnvFirebaseStorage, dotEnvVoiceVox } from '../../dataSources/env/DotEnv'
import { VoiceVoxClient } from '../../dataSources/voiceVox/voiceVoxClient'
import { firebaseStorage } from '../../dataSources/firebase/firebase'

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
   * speechTextを音声化してstorageにアップロードする
   */
  public async saveMp3BySpeechText(speechText: string, filePath: string): Promise<string> {
    const arrayBuffer = await this.voiceVoxRepository.generateVoice(speechText)
    console.log('VoiceVoxUseCase saveMp3BySpeechText() arrayBuffer', arrayBuffer.byteLength)

    await this.firebaseStorageRepository.uploadArrayBuffer(
      this.storageBucketName,
      filePath,
      arrayBuffer,
    )

    return filePath
  }
}
