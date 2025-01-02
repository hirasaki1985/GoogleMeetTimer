import { useMemo } from 'react'
import { WebApiFetchSignedUrlRepository } from '@/dataSources/webApi/speechTextSignedUrl/repository'
import { WebApiFetchVoiceRepository } from '@/dataSources/webApi/fetchVoice/repository'

/**
 * webapi: /speechTextSignedUrl
 */
export const useWebApiFetchSignedUrl = () => {
  const webApiRepository = new WebApiFetchSignedUrlRepository()
  return useMemo(() => webApiRepository, [webApiRepository])
}

/**
 * webapi: /fetchVoice
 */
export const useWebApiFetchVoice = () => {
  const webApiRepository = new WebApiFetchVoiceRepository()
  return useMemo(() => webApiRepository, [webApiRepository])
}
