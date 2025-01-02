import { useCallback } from 'react'
import { useWebApiFetchVoice } from '@/dataSources/webApi/useWebApi'
import {
  WebApiFetchVoicePutRequest,
  WebApiFetchVoicePutResponse,
} from '@/dataSources/webApi/fetchVoice/type'

/**
 * meetingIdの音声データを最新の状態にする
 */
export const useFetchVoicePut = () => {
  const webApi = useWebApiFetchVoice()

  return useCallback(
    async (request: WebApiFetchVoicePutRequest): Promise<WebApiFetchVoicePutResponse> => {
      return await webApi.put(request)
    },
    [webApi],
  )
}
