import dotenv from 'dotenv'
dotenv.config()
import { VoiceVoxUseCase } from './features/VoiceVox/VoiceVoxUseCase'

export const testFileUpload = async () => {
  const useCase = new VoiceVoxUseCase()

  await useCase.saveMp3BySpeechText('テストなのだ', 'zundamon_speech.mp3')
}

testFileUpload()
