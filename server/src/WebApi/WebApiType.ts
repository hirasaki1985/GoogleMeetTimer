export type WebApiErrorResponseMessage = {
  type: string
  message: string
}

export type WebApiErrorResponse = {
  success?: boolean | undefined
  messages?: WebApiErrorResponseMessage[] | undefined
}
