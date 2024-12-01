import {
  initWebApiFetchSignedUrlResponse,
  WebApiFetchSignedUrlGet,
  WebApiFetchSignedUrlRequest,
  WebApiFetchSignedUrlResponse,
} from '@/dataSources/webApi/type/WebApiRepositoryType'
import { Mutex } from 'async-mutex'
import { setWebApiErrorResponse } from '@/dataSources/webApi/common/WebApiResponse'
import axios from 'axios'

/**
 * Mutex
 */
const getMutex = new Mutex()

export class WebApiRepository {
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
      const result = await axios.get(WebApiFetchSignedUrlGet, {})

      // create response
      return initWebApiFetchSignedUrlResponse()
        .setData({
          url: result.data?.url ?? '',
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
