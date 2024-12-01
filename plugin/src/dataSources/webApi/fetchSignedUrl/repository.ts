import {
  initWebApiFetchSignedUrlResponse,
  WebApiFetchSignedUrlRequest,
  WebApiFetchSignedUrlResponse,
} from '@/dataSources/webApi/fetchSignedUrl/type'
import { Mutex } from 'async-mutex'
import { setWebApiErrorResponse } from '@/dataSources/webApi/WebApiResponse'
import { aspidaClient } from '@/dataSources/webApi/AspidaClient'

/**
 * Mutex
 */
const getMutex = new Mutex()

export class WebApiFetchSignedUrlRepository {
  private aspidaClient = aspidaClient
  public async fetchSignedUrl(
    request: WebApiFetchSignedUrlRequest,
  ): Promise<WebApiFetchSignedUrlResponse> {
    // check: processing
    if (getMutex.isLocked()) {
      return initWebApiFetchSignedUrlResponse().setCodeProcessing()
    }

    // lock
    const release = await getMutex.acquire()

    try {
      // execute api
      const result = await this.aspidaClient.speechTextSignedUrl.get({
        query: {
          text: request.text,
        },
      })

      // create response
      return initWebApiFetchSignedUrlResponse()
        .setData({
          url: result.body?.url ?? '',
        })
        .setCodeSuccess()
    } catch (e) {
      return await setWebApiErrorResponse(initWebApiFetchSignedUrlResponse(), e)
    } finally {
      // release
      release()
    }
  }
}
