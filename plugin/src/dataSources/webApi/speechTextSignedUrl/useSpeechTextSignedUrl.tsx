import { useCallback } from 'react'
import {
  WebApiFetchSignedUrlGetRequest,
  WebApiFetchSignedUrlGetResponse,
} from '@/dataSources/webApi/speechTextSignedUrl/type'
import { useWebApiFetchSignedUrl } from '@/dataSources/webApi/useWebApi'

/**
 * mp3ファイルの認証付きURLを取得する
 */
export const useSpeechTextSignedUrlGet = () => {
  const webApi = useWebApiFetchSignedUrl()

  return useCallback(
    async (request: WebApiFetchSignedUrlGetRequest): Promise<WebApiFetchSignedUrlGetResponse> => {
      return await webApi.get(request)
    },
    [webApi],
  )
}
