import { Request, Response } from 'express'
import { VoiceVoxUseCase } from '../features/VoiceVox/VoiceVoxUseCase'

/**
 * 音声データの認証付きURLを取得する
 */
export const getSpeechTextSignedUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const text = req.query.text || req.body.text
    const useCase = new VoiceVoxUseCase()

    const url = await useCase.fetchSignedUrl(text)
    console.log('getSpeechTextSignedUrl() url', url)
    res.send({
      url: url,
    })
    return
  } catch (e) {
    console.error(e)
  }

  res.send('error')
}
