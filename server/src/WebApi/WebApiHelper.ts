import { WebApiErrorResponse } from './WebApiType'

/**
 * Exceptionが発生した場合のAPIの戻り値を生成する
 */
export const webApiHelperHandleError = (error: Error): WebApiErrorResponse => {
  return { success: false, messages: [{ type: 'error', message: error.message }] }
}
