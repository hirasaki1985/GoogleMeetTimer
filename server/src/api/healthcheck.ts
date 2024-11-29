import { Request, Response } from 'express'
import { dotEnvFirebaseStorage } from '../dataSources/env/DotEnv'

/**
 * hello world
 */
export const healthcheck = async (req: Request, res: Response): Promise<void> => {
  try {
    const name = req.query.name || req.body.name || 'World'

    console.log(dotEnvFirebaseStorage())
    // const useCase = new VoiceVoxUseCase()

    // await useCase.saveMp3BySpeechText('テストなのだ', 'zundamon_speech.mp3')

    res.send(`Hello, ${name}!`)
    return
  } catch (e) {
    console.error(e)
  }

  res.send('error')
}
