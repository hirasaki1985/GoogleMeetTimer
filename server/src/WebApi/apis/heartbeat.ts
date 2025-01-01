import { Request, Response } from 'express'
import { WebApiResponseStatus } from '../WebApiConst'
import { webApiHelperHandleError } from '../WebApiHelper'

/**
 * hello world
 */
export const heartbeat = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(WebApiResponseStatus.Success).json(true)
    return
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      res.status(WebApiResponseStatus.InternalServerError).json(webApiHelperHandleError(e))
    }
  }
}
