export const WebApiResponseStatus = {
  Success: 200,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  InternalServerError: 500,
} as const
export type WebApiResponseStatus = (typeof WebApiResponseStatus)[keyof typeof WebApiResponseStatus]
