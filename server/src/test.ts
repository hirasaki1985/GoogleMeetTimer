import dotenv from 'dotenv'
dotenv.config()
import { VoiceManagerUseCase } from './features/VoiceManager/VoiceManagerUseCase'

export const testFileUpload = async () => {
  const useCase = new VoiceManagerUseCase()

  const url = await useCase.fetchSignedUrl('テストなのだ')
  console.log(url)
}

testFileUpload()
