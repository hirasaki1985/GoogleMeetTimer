import { AxiosError, AxiosResponse } from 'axios'

/**
 * response code
 */
export const DomainResponseStatus = {
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
export type DomainResponseStatus = (typeof DomainResponseStatus)[keyof typeof DomainResponseStatus]

/**
 * success code
 */
const DomainSuccessCodes: DomainResponseStatus[] = [
  DomainResponseStatus.Ok,
  DomainResponseStatus.Created,
  DomainResponseStatus.NoContent,
]

/**
 * error payload
 * サーバ側でエラー(例外)があった場合のエラーメッセージ
 */
export interface DomainResponseErrorPayload {
  message: string
}

/**
 * サーバ側でvalidateに引っかかった時のフォーマット
 */
export interface DomainResponseValidateErrorPayload {
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
 * DomainResponse
 */
export class DomainResponse<Data> {
  public status: DomainResponseStatus = DomainResponseStatus.Init
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
        ? (Number(axiosResponse.status) as DomainResponseStatus)
        : DomainResponseStatus.Init
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
    return DomainSuccessCodes.includes(this.status)
  }

  hasValidate() {
    return this.status === DomainResponseStatus.BadRequest
  }

  isProcessing() {
    return this.status === DomainResponseStatus.Processing
  }

  /**
   * set code
   */
  public setCodeSuccess() {
    this.status = DomainResponseStatus.Ok
    return this
  }

  public setCodeError() {
    this.status = DomainResponseStatus.Init
    return this
  }

  public setCodeProcessing() {
    this.status = DomainResponseStatus.Processing
    return this
  }

  public setValidateError() {
    this.status = DomainResponseStatus.BadRequest
    return this
  }

  public setCode(code: DomainResponseStatus) {
    this.status = code
    return this
  }

  public setCodeByHttpCode(code: DomainResponseStatus) {
    this.status = code
    return this
  }

  /**
   * set error
   */
  public setByErrorResponse(axiosError: AxiosError<DomainResponseErrorPayload>) {
    if (axiosError == null) return this

    this.status = Number(axiosError.response?.status || '')
      ? (Number(axiosError.response?.status) as DomainResponseStatus)
      : DomainResponseStatus.Init
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
  public getValidateMessages(): DomainResponseValidateErrorPayload[] | undefined {
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
  public getFirstValidateMessage(): DomainResponseValidateErrorPayload | undefined {
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
export async function setDomainErrorResponse<Data>(
  data: DomainResponse<Data>,
  e: unknown,
): Promise<DomainResponse<Data>> {
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
