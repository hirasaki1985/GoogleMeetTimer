import { WebApiResponse } from '@/dataSources/webApi/WebApiResponse'
import { SpeechTextSignedUrlResponse } from '@/dataSources/webApi/openapi/WebApi/@types'

/**
 * speechTextSignedUrl: get
 */
export interface WebApiFetchSignedUrlGetRequest {
  text: string
}
export type WebApiFetchSignedUrlGetPayload = SpeechTextSignedUrlResponse
export type WebApiFetchSignedUrlGetResponse = WebApiResponse<WebApiFetchSignedUrlGetPayload>
export const initWebApiFetchSignedUrlGetResponse = () =>
  new WebApiResponse<WebApiFetchSignedUrlGetPayload>({
    url: '',
  })
