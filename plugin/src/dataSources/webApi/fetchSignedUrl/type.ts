import { WebApiResponse } from '@/dataSources/webApi/WebApiResponse'
import { SpeechTextSignedUrlResponse } from '@/dataSources/webApi/openapi/WebApi/@types'

/**
 * fetchSignedUrl
 */
export interface WebApiFetchSignedUrlRequest {
  text: string
}
export type WebApiFetchSignedUrlPayload = SpeechTextSignedUrlResponse
export type WebApiFetchSignedUrlResponse = WebApiResponse<WebApiFetchSignedUrlPayload>
export const initWebApiFetchSignedUrlResponse = () =>
  new WebApiResponse<WebApiFetchSignedUrlPayload>({
    url: '',
  })
