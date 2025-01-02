import { Request, Response } from 'express'
import { VoiceManagerUseCase } from '../../features/VoiceManager/VoiceManagerUseCase'
import { webApiHelperHandleError } from '../WebApiHelper'

/**
 * 音声データを最新の状態にする
 */
export const putFetchVoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const meetingId = req.body && req.body.meetingId
    const textId = req.body && req.body.textId
    const useCase = new VoiceManagerUseCase()

    const success = await useCase.fetchVoice(meetingId, textId)
    console.log('putFetchVoice() success', success)

    res.send({
      success,
    })
    return
  } catch (e) {
    webApiHelperHandleError(e, res)
  }
}
