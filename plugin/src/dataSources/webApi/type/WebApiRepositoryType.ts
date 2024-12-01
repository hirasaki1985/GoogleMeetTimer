import { DomainResponse } from '@/dataSources/webApi/common/DomainResponse'
import { SpeechTextSignedUrlResponse } from '@/dataSources/webApi/openapi/api/@types'

/**
 * fetchSignedUrl
 */
export const WebApiFetchSignedUrlGet = '/speechTextSignedUrl'
export interface WebApiFetchSignedUrlRequest {
  text: string
}
export type WebApiFetchSignedUrlPayload = SpeechTextSignedUrlResponse
export type WebApiFetchSignedUrlResponse = DomainResponse<WebApiFetchSignedUrlPayload>
export const initWebApiFetchSignedUrlResponse = () =>
  new DomainResponse<WebApiFetchSignedUrlPayload>({
    url: '',
  })
