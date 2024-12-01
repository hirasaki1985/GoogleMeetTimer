import { useCallback } from 'react'
import {
  WebApiFetchSignedUrlRequest,
  WebApiFetchSignedUrlResponse,
} from '@/dataSources/webApi/fetchSignedUrl/type'
import { useWebApi } from '@/dataSources/webApi/useWebApi'

export const useFetchSignedUrl = () => {
  const webApi = useWebApi()

  return useCallback(
    async (request: WebApiFetchSignedUrlRequest): Promise<WebApiFetchSignedUrlResponse> => {
      return await webApi.fetchSignedUrl(request)
    },
    [webApi],
  )
}
