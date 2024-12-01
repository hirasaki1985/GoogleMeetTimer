import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_1b3bmas } from './speechTextSignedUrl';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/speechTextSignedUrl';
  const GET = 'GET';

  return {
    speechTextSignedUrl: {
      /**
       * @returns Successful request
       */
      get: (option: { query: Methods_1b3bmas['get']['query'], config?: T | undefined }) =>
        fetch<Methods_1b3bmas['get']['resBody'], BasicHeaders, Methods_1b3bmas['get']['status']>(prefix, PATH0, GET, option).json(),
      /**
       * @returns Successful request
       */
      $get: (option: { query: Methods_1b3bmas['get']['query'], config?: T | undefined }) =>
        fetch<Methods_1b3bmas['get']['resBody'], BasicHeaders, Methods_1b3bmas['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods_1b3bmas['get']['query'] } | undefined) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
