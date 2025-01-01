import { Request, Response } from 'express'

/**
 * hello world
 */
export const heartbeat = async (req: Request, res: Response): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    res.status(200).json(true)
    return
  } catch (e) {
    console.error(e)
    // res.status(500).json({ success: false, message: 'Internal Server Error' })
  }

  // res.send('error')
}
