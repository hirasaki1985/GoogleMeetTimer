import {
  initWebApiFetchSignedUrlGetResponse,
  WebApiFetchSignedUrlGetRequest,
  WebApiFetchSignedUrlGetResponse,
} from '@/dataSources/webApi/speechTextSignedUrl/type'
import { Mutex } from 'async-mutex'
import { setWebApiErrorResponse } from '@/dataSources/webApi/WebApiResponse'
import { aspidaClient } from '@/dataSources/webApi/AspidaClient'

/**
 * Mutex
 */
const getMutex = new Mutex()

export class WebApiFetchSignedUrlRepository {
  private aspidaClient = aspidaClient

  /**
   * 認証付きURLを取得する
   */
  public async get(
    request: WebApiFetchSignedUrlGetRequest,
  ): Promise<WebApiFetchSignedUrlGetResponse> {
    // check: processing
    if (getMutex.isLocked()) {
      return initWebApiFetchSignedUrlGetResponse().setCodeProcessing()
    }

    // lock
    const release = await getMutex.acquire()

    try {
      console.log('WebApiFetchSignedUrlRepository get() request', request)
      // execute WebApi
      const result = await this.aspidaClient.speechTextSignedUrl.get({
        query: {
          text: request.text,
        },
      })
      console.log('WebApiFetchSignedUrlRepository get() result', result)

      // create response
      return initWebApiFetchSignedUrlGetResponse()
        .setData({
          url: result.body?.url ?? '',
        })
        .setCodeSuccess()
    } catch (e) {
      console.log(e)
      return await setWebApiErrorResponse(initWebApiFetchSignedUrlGetResponse(), e)
    } finally {
      // release
      release()
    }
  }
}
