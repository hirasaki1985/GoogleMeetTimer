import { WebApiResponseStatus } from './WebApiConst'
import { Response } from 'express'

/**
 * Exception
 */
export const webApiHelperHandleError = (error: Error | unknown, res: Response) => {
  console.error(error)
  if (error instanceof Error) {
    res
      .status(WebApiResponseStatus.InternalServerError)
      .json({ success: false, messages: [{ type: 'error', message: error.message }] })
    return
  }
}
