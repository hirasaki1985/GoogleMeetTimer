import dotenv from 'dotenv'
dotenv.config()
import { VoiceVoxUseCase } from './features/VoiceVox/VoiceVoxUseCase'

export const testFileUpload = async () => {
  const useCase = new VoiceVoxUseCase()

  const url = await useCase.fetchSignedUrl('テストなのだ')
  console.log(url)
}

testFileUpload()
