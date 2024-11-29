import dotenv from 'dotenv'
dotenv.config()

import { Request, Response } from 'express'
import { dotEnvFirebaseStorage } from './dataSources/env/DotEnv'
import { VoiceVoxUseCase } from './features/VoiceVox/VoiceVoxUseCase'

/**
 * hello world
 */
export const helloWorld = async (req: Request, res: Response): Promise<void> => {
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

/**
 * 音声データの認証付きURLを取得する
 */
export const getSpeechTextSignedUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const text = req.query.text || req.body.text
    const useCase = new VoiceVoxUseCase()

    const url = await useCase.fetchSignedUrl(text)
    res.send({
      url: url,
    })
    return
  } catch (e) {
    console.error(e)
  }

  res.send('error')
}
