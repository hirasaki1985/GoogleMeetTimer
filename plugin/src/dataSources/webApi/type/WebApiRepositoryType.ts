import { WebApiResponse } from '@/dataSources/webApi/common/WebApiResponse'
import { SpeechTextSignedUrlResponse } from '@/dataSources/webApi/openapi/api/@types'

/**
 * fetchSignedUrl
 */
export const WebApiFetchSignedUrlGet = '/speechTextSignedUrl'
export interface WebApiFetchSignedUrlRequest {
  text: string
}
export type WebApiFetchSignedUrlPayload = SpeechTextSignedUrlResponse
export type WebApiFetchSignedUrlResponse = WebApiResponse<WebApiFetchSignedUrlPayload>
export const initWebApiFetchSignedUrlResponse = () =>
  new WebApiResponse<WebApiFetchSignedUrlPayload>({
    url: '',
  })
