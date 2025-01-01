/* eslint-disable */
export type WebApiErrorResponseMessage = {
  type: string;
  message: string;
}

export type WebApiErrorResponse = {
  success?: boolean | undefined;
  messages?: WebApiErrorResponseMessage[] | undefined;
}

export type HeartBeatResponse = boolean

export type SpeechTextSignedUrlResponse = {
  /** 音声データの認証付きURL */
  url: string;
}

export type FetchVoicePutRequest = {
  /** 会議ID */
  meetingId: string;
}

export type FetchVoicePutResponse = {
  /** 成功したかどうか */
  success: boolean;
}

export type BadRequest = WebApiErrorResponse

export type Unauthorized = WebApiErrorResponse

export type Forbidden = WebApiErrorResponse

export type NotFound = WebApiErrorResponse

export type InternalServerError = WebApiErrorResponse
