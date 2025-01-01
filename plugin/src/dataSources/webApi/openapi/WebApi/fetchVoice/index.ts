/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../@types';

export type Methods = DefineMethods<{
  put: {
    status: 200;
    /** Successful request */
    resBody: Types.FetchVoicePutResponse;
    reqBody: Types.FetchVoicePutRequest;
  };
}>;
