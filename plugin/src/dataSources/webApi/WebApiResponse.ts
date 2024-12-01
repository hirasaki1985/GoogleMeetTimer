import { AxiosError, AxiosResponse } from 'axios'

/**
 * response code
 */
export const WebApiResponseStatus = {
  Init: 0,
  Processing: 1, // get mutex limit
  Ok: 200, // success
  Created: 201,
  NoContent: 204,
  BadRequest: 400, // validate error
  Unauthorized: 401,
  Forbidden: 403,
  Conflict: 409,
  UnprocessableEntity: 422,
  InternalServerError: 500, // server error
} as const
export type WebApiResponseStatus = (typeof WebApiResponseStatus)[keyof typeof WebApiResponseStatus]

/**
 * success code
 */
const WebApiSuccessCodes: WebApiResponseStatus[] = [
  WebApiResponseStatus.Ok,
  WebApiResponseStatus.Created,
  WebApiResponseStatus.NoContent,
]

/**
 * error payload
 * サーバ側でエラー(例外)があった場合のエラーメッセージ
 */
export interface WebApiResponseErrorPayload {
  message: string
}

/**
 * サーバ側でvalidateに引っかかった時のフォーマット
 */
export interface WebApiResponseValidateErrorPayload {
  location: string
  msg: string
  param: string
  value?: string | number | boolean
}

/**
 * 既にリクエストが実行されている場合にスローする.
 */
export class ProcessingRequestError extends Error {}

/**
 * WebApiResponse
 */
export class WebApiResponse<Data> {
  public status: WebApiResponseStatus = WebApiResponseStatus.Init
  public data: Data

  // errors
  public errorCode = ''
  public errorHttpMessage = ''
  public errorMessage = ''

  public axiosResponse?: AxiosResponse = undefined

  /**
   * constructor
   */
  constructor(data: Data) {
    this.data = data

    return this
  }

  /**
   * data is not update
   */
  setByHttpResponse(axiosResponse: AxiosResponse) {
    this.axiosResponse = axiosResponse

    if (axiosResponse.status) {
      this.status = Number(axiosResponse.status)
        ? (Number(axiosResponse.status) as WebApiResponseStatus)
        : WebApiResponseStatus.Init
    }

    if (!this.isSuccess()) {
      if (axiosResponse instanceof AxiosError) {
        this.setByErrorResponse(axiosResponse)
      }
    }

    return this
  }

  public setByError(e: Error) {
    this.errorCode = e.name
    this.errorMessage = e.message

    this.setCodeError()
  }

  /**
   * is success
   */
  isSuccess() {
    return WebApiSuccessCodes.includes(this.status)
  }

  hasValidate() {
    return this.status === WebApiResponseStatus.BadRequest
  }

  isProcessing() {
    return this.status === WebApiResponseStatus.Processing
  }

  /**
   * set code
   */
  public setCodeSuccess() {
    this.status = WebApiResponseStatus.Ok
    return this
  }

  public setCodeError() {
    this.status = WebApiResponseStatus.Init
    return this
  }

  public setCodeProcessing() {
    this.status = WebApiResponseStatus.Processing
    return this
  }

  public setValidateError() {
    this.status = WebApiResponseStatus.BadRequest
    return this
  }

  public setCode(code: WebApiResponseStatus) {
    this.status = code
    return this
  }

  public setCodeByHttpCode(code: WebApiResponseStatus) {
    this.status = code
    return this
  }

  /**
   * set error
   */
  public setByErrorResponse(axiosError: AxiosError<WebApiResponseErrorPayload>) {
    if (axiosError == null) return this

    this.status = Number(axiosError.response?.status || '')
      ? (Number(axiosError.response?.status) as WebApiResponseStatus)
      : WebApiResponseStatus.Init
    this.errorCode = axiosError.code || ''
    this.errorHttpMessage = axiosError.message || ''
    this.errorMessage = axiosError.response?.data?.message || ''

    this.axiosResponse = axiosError.response

    return this
  }

  public setErrorMessage(errorMessage: string) {
    this.errorMessage = errorMessage
    return this
  }

  public hasErrorMessage(): boolean {
    if (this.errorMessage != null && this.errorMessage !== '') return true

    return (
      this.axiosResponse?.data?.errors &&
      Array.isArray(this.axiosResponse.data.errors) &&
      this.axiosResponse.data.errors.length > 0
    )
  }

  public getErrorMessage(): string {
    if (this.errorMessage != null && this.errorMessage !== '') {
      return this.errorMessage
    }
    if (
      this.axiosResponse?.data?.errors &&
      Array.isArray(this.axiosResponse.data.errors) &&
      this.axiosResponse.data.errors.length > 0
    ) {
      const item = this.axiosResponse.data.errors[0]
      return item.msg || ''
    }

    return ''
  }

  /**
   * validateメッセージがあった場合に返す
   * undefined = なし
   */
  public getValidateMessages(): WebApiResponseValidateErrorPayload[] | undefined {
    if (
      this.axiosResponse?.data?.errors &&
      Array.isArray(this.axiosResponse.data.errors) &&
      this.axiosResponse.data.errors.length > 0
    ) {
      return this.axiosResponse.data.errors
    }

    return
  }

  /**
   * 最初のvalidateメッセージを返す
   * undefined = なし
   */
  public getFirstValidateMessage(): WebApiResponseValidateErrorPayload | undefined {
    if (
      this.axiosResponse?.data?.errors &&
      Array.isArray(this.axiosResponse.data.errors) &&
      this.axiosResponse.data.errors.length > 0
    ) {
      return this.axiosResponse.data.errors[0]
    }

    return
  }

  /**
   * set data
   */
  public setData(data: Data) {
    this.data = data
    return this
  }
}

/**
 * 例外処理のハンドリング
 */
export async function setWebApiErrorResponse<Data>(
  data: WebApiResponse<Data>,
  e: unknown,
): Promise<WebApiResponse<Data>> {
  // if (e instanceof HTTPError) {
  //   const errorMessage = await e.response.text()
  //   const parseData = JSON.parse(errorMessage)
  //   if (
  //     parseData.errors != null &&
  //     Array.isArray(parseData.errors) &&
  //     parseData.errors.length > 0
  //   ) {
  //     const _data = parseData.errors[0]
  //     data.setErrorMessage(_data.msg)
  //     data.setCodeError()
  //   }
  // } else
  if (e instanceof AxiosError) {
    data.setByErrorResponse(e)
  } else if (e instanceof Error) {
    data.setByError(e)
  } else if (typeof e === 'string') {
    data.errorMessage = e
    data.setCodeError()
  }

  return data
}
