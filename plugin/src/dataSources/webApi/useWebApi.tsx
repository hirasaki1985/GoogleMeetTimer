import { useMemo } from 'react'
import { WebApiFetchSignedUrlRepository } from '@/dataSources/webApi/fetchSignedUrl/repository'

export const useWebApi = () => {
  const webApiRepository = new WebApiFetchSignedUrlRepository()
  return useMemo(() => webApiRepository, [webApiRepository])
}
