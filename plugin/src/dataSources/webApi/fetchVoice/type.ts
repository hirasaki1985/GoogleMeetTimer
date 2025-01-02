import { WebApiResponse } from '@/dataSources/webApi/WebApiResponse'
import {
  FetchVoicePutRequest,
  FetchVoicePutResponse,
} from '@/dataSources/webApi/openapi/WebApi/@types'

/**
 * fetchVoice: put
 */
export type WebApiFetchVoicePutRequest = FetchVoicePutRequest
export type WebApiFetchVoicePutPayload = FetchVoicePutResponse
export type WebApiFetchVoicePutResponse = WebApiResponse<WebApiFetchVoicePutPayload>
export const initWebApiFetchVoicePutResponse = () =>
  new WebApiResponse<WebApiFetchVoicePutPayload>({
    success: false,
  })
