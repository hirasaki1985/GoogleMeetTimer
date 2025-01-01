import { Request, Response } from 'express'
import { VoiceManagerUseCase } from '../../features/VoiceManager/VoiceManagerUseCase'
import { webApiHelperHandleError } from '../WebApiHelper'

/**
 * 音声データの認証付きURLを取得する
 */
export const getSpeechTextSignedUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const text = req.query.text || (req.body && req.body.text)
    const useCase = new VoiceManagerUseCase()

    const url = await useCase.fetchSignedUrl(text)
    console.log('getSpeechTextSignedUrl() url', url)

    res.send({
      url: url,
    })
    return
  } catch (e) {
    webApiHelperHandleError(e, res)
  }
}
