/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../@types';

export type Methods = DefineMethods<{
  get: {
    query: {
      text: string;
    };

    status: 200;
    /** Successful request */
    resBody: Types.SpeechTextSignedUrlResponse;
  };
}>;
