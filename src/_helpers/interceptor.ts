import Axios from 'axios-observable';
import { AxiosRequestConfig } from 'axios';
import { of } from 'rxjs';

/** Interceptors */

const intercept = () => {
  Axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      config.headers = {
        ...config.headers,
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8'
      };

      /** Аутентификация */
      if (process.env.REACT_APP_BASIC_AUTH) {
        config.headers.Authorization = process.env.REACT_APP_BASIC_AUTH;
      }

      /** Для поиска */
      if (config.headers.hasOwnProperty('search')) {
        if (process.env.REACT_APP_ENV && process.env.REACT_APP_ENV === 'dev') {
          config.headers['Authorization'] = 'Basic dXNlcjpwYXNzd29yZA==';
        }

        if (process.env.REACT_APP_SEARCH_HOST) {
          config.url = process.env.REACT_APP_SEARCH_HOST + config.url;
        }
        return config;
      }

      /** Сервисы из BW */
      if (config.headers.hasOwnProperty('bw')) {
        if (process.env.REACT_APP_ENV && process.env.REACT_APP_ENV === 'dev') {
          if (process.env.REACT_APP_BASIC_AUTH) {
            config.headers.Authorization = process.env.REACT_APP_BASIC_AUTH;
          }
        }

        if (process.env.REACT_APP_BW_HOST) {
          config.url =
            process.env.REACT_APP_BW_HOST +
            process.env.REACT_APP_BW_PATH +
            config.url;
        }

        return config;
      }

      /** Web Sockets */
      if (config.headers.hasOwnProperty('ws')) {
        if (process.env.REACT_APP_SOCKET_URL) {
          config.url = process.env.REACT_APP_SOCKET_URL + config.url;
          return config;
        }
      }

      /** Сбор обратной связи */
      if (config.headers.hasOwnProperty('feedback')) {
        if (process.env.REACT_APP_FEEDBACK) {
          config.url = process.env.REACT_APP_FEEDBACK + config.url;
        }
        return config;
      }

      /** Все остальное */
      if (process.env.REACT_APP_HOST) {
        config.url =
          process.env.REACT_APP_HOST + process.env.REACT_APP_PATH + config.url;
      }

      return config;
    },
    (error) => {
      return of(new Error(error));
    }
  );
};

export default intercept;
