import { Request, Response } from 'express'
import { WebApiResponseStatus } from '../WebApiConst'
import { webApiHelperHandleError } from '../WebApiHelper'

/**
 * hello world
 */
export const getHeartbeat = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(WebApiResponseStatus.Success).json(true)
    return
  } catch (e) {
    webApiHelperHandleError(e, res)
  }
}
