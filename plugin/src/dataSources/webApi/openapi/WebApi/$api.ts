import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_1ab8gg } from './fetchVoice';
import type { Methods as Methods_6q0z2u } from './heartbeat';
import type { Methods as Methods_1b3bmas } from './speechTextSignedUrl';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/fetchVoice';
  const PATH1 = '/heartbeat';
  const PATH2 = '/speechTextSignedUrl';
  const GET = 'GET';
  const PUT = 'PUT';

  return {
    fetchVoice: {
      /**
       * @returns Successful request
       */
      put: (option: { body: Methods_1ab8gg['put']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1ab8gg['put']['resBody'], BasicHeaders, Methods_1ab8gg['put']['status']>(prefix, PATH0, PUT, option).json(),
      /**
       * @returns Successful request
       */
      $put: (option: { body: Methods_1ab8gg['put']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1ab8gg['put']['resBody'], BasicHeaders, Methods_1ab8gg['put']['status']>(prefix, PATH0, PUT, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    heartbeat: {
      /**
       * @returns Successful request
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_6q0z2u['get']['resBody'], BasicHeaders, Methods_6q0z2u['get']['status']>(prefix, PATH1, GET, option).json(),
      /**
       * @returns Successful request
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_6q0z2u['get']['resBody'], BasicHeaders, Methods_6q0z2u['get']['status']>(prefix, PATH1, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
    speechTextSignedUrl: {
      /**
       * @returns Successful request
       */
      get: (option: { query: Methods_1b3bmas['get']['query'], config?: T | undefined }) =>
        fetch<Methods_1b3bmas['get']['resBody'], BasicHeaders, Methods_1b3bmas['get']['status']>(prefix, PATH2, GET, option).json(),
      /**
       * @returns Successful request
       */
      $get: (option: { query: Methods_1b3bmas['get']['query'], config?: T | undefined }) =>
        fetch<Methods_1b3bmas['get']['resBody'], BasicHeaders, Methods_1b3bmas['get']['status']>(prefix, PATH2, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_1b3bmas['get']['query'] } | undefined) =>
        `${prefix}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
