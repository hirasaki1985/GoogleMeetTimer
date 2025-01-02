import { Mutex } from 'async-mutex'
import { setWebApiErrorResponse } from '@/dataSources/webApi/WebApiResponse'
import { aspidaClient } from '@/dataSources/webApi/AspidaClient'
import {
  initWebApiFetchVoicePutResponse,
  WebApiFetchVoicePutRequest,
  WebApiFetchVoicePutResponse,
} from '@/dataSources/webApi/fetchVoice/type'

/**
 * Mutex
 */
const putMutex = new Mutex()

export class WebApiFetchVoiceRepository {
  private aspidaClient = aspidaClient

  /**
   * 音声ファイルのURLを更新する
   */
  public async put(request: WebApiFetchVoicePutRequest): Promise<WebApiFetchVoicePutResponse> {
    // check: processing
    if (putMutex.isLocked()) {
      return initWebApiFetchVoicePutResponse().setCodeProcessing()
    }

    // lock
    const release = await putMutex.acquire()

    try {
      console.log('WebApiFetchVoiceRepository put() request', request)
      // execute WebApi
      const result = await this.aspidaClient.fetchVoice.put({
        body: request,
      })
      console.log('WebApiFetchVoiceRepository put() result', result)

      // create response
      return initWebApiFetchVoicePutResponse()
        .setData({
          success: result.body.success,
        })
        .setCodeSuccess()
    } catch (e) {
      console.log(e)
      return await setWebApiErrorResponse(initWebApiFetchVoicePutResponse(), e)
    } finally {
      // release
      release()
    }
  }
}
