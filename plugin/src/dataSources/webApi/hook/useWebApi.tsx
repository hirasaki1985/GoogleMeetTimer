import { useCallback, useMemo } from 'react'
import { WebApiRepository } from '@/dataSources/webApi/repository/WebApiRepository'
import {
  WebApiFetchSignedUrlRequest,
  WebApiFetchSignedUrlResponse,
} from '@/dataSources/webApi/type/WebApiRepositoryType'

export const useWebApi = () => {
  const webApiRepository = new WebApiRepository()
  return useMemo(() => webApiRepository, [webApiRepository])
}

export const useWebApiFetchSignedUrl = () => {
  const webApi = useWebApi()

  return useCallback(
    async (request: WebApiFetchSignedUrlRequest): Promise<WebApiFetchSignedUrlResponse> => {
      return await webApi.fetchSignedUrl(request)
    },
    [webApi],
  )
}
