import { CompatClient, IMessage, Stomp, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { useEffect } from 'react';
import { _socket } from '../App';
import Axios from 'axios-observable';
import { AxiosResponse } from 'axios';
import { sendNotification } from '../react_shared/components/notifications/notification';

interface ISocketUrl {
  sUrl: string;
  sTopic: string;
  sAlias: string;
}

interface IConnection {
  established: boolean;
  subscription: StompSubscription | undefined;
}

export interface IStringMap<T> {
  [key: string]: T;
}

type ISubscribeCallback = (data: IMessage) => void;

export class SocketsService {
  /** Все соединения */
  private connections: IStringMap<IConnection> = {};
  /** Сокет клиент */
  private stompClient: IStringMap<CompatClient> = {};

  /** Список элиасов для подключения к нужному модулю */
  private aliases: IStringMap<string> = {
    socketModule1: process.env.REACT_APP_SOCKET_MODULE_1 || 'socketModule1',
    socketModule2: process.env.REACT_APP_SOCKET_MODULE_2 || 'socketModule2',
    socketModule3: process.env.REACT_APP_SOCKET_MODULE_3 || 'socketModule3',
    socketModule4: process.env.REACT_APP_SOCKET_MODULE_4 || 'socketModule4',
    socketModule5: process.env.REACT_APP_SOCKET_MODULE_5 || 'socketModule5',
    socketModule6: process.env.REACT_APP_SOCKET_MODULE_6 || 'socketModule6',
    socketModule7: process.env.REACT_APP_SOCKET_MODULE_7 || 'socketModule7',
    socketModule8: process.env.REACT_APP_SOCKET_MODULE_8 || 'socketModule8',
    socketModule9: process.env.REACT_APP_SOCKET_MODULE_9 || 'socketModule9',
    socketModule10: process.env.REACT_APP_SOCKET_MODULE_10 || 'socketModule10',
    socketModule11: process.env.REACT_APP_SOCKET_MODULE_11 || 'socketModule11',
    socketModule12: process.env.REACT_APP_SOCKET_MODULE_12 || 'socketModule12',
    socketModule13: process.env.REACT_APP_SOCKET_MODULE_13 || 'socketModule13',
    socketModule14: process.env.REACT_APP_SOCKET_MODULE_14 || 'socketModule14',
    socketModule15: process.env.REACT_APP_SOCKET_MODULE_15 || 'socketModule15',
    socketModule16: process.env.REACT_APP_SOCKET_MODULE_16 || 'socketModule16',
    socketModule17: process.env.REACT_APP_SOCKET_MODULE_17 || 'socketModule17',
    socketModule18: process.env.REACT_APP_SOCKET_MODULE_18 || 'socketModule18',
    socketModule19: process.env.REACT_APP_SOCKET_MODULE_19 || 'socketModule19',
    socketModule20: process.env.REACT_APP_SOCKET_MODULE_20 || 'socketModule20'
  };

  /** Переподключение запущено */
  private reconnectIsRunning = false;
  /** Сообщение о переподключении */
  private reconnectMessage = 'Вы отсоединились. Переподключаем...';

  /** Получаем URL сокетов
   * @params topic - уникальное название соединения
   * @params onSubscribe - функция, которая вызывается при подписке
   * */
  public connect(topic: string, onSubscribe: ISubscribeCallback, changeCallback?: boolean): void {

    if (!(this.connections[topic] && this.connections[topic].established)) {
      Axios.post<ISocketUrl>(
        'rtf-balancingproxy-server/client/getSocketUrl',
        { sTopic: `/topic/${topic}` },
        { headers: { ws: 'true', 'Content-Type': 'application/json;charset=utf-8' } }
      ).subscribe(
        (response: AxiosResponse<ISocketUrl>) => {
          this.establishConnection(topic, response.data, onSubscribe);
        },
        (() => {
          sendNotification({
            sMessage: 'Возникла ошибка при установке соединения',
            iStatus: 0
          });
        }));
    } else {
      /** Если соединение установлено */
      if (changeCallback) {
        this.topicSubscriber(topic, `/topic/${topic}`, onSubscribe);
      }
    }
  }

  /** Функция установки соединения
   * @params topic - уникальное название соединения
   * @params credentials - содержит URL и название топика
   * @params onSubscribe - функция, которая вызывается при подписке
   * */
  private establishConnection(
    name: string,
    credentials: ISocketUrl,
    onSubscribe: ISubscribeCallback
  ): void {
    if (this.connections[name] && this.connections[name].established) {
      this.topicSubscriber(name, credentials.sTopic, onSubscribe);
    } else {
      if (!credentials.sAlias) {
        credentials.sAlias = 'socketModule1';
      }

      const socketUrl: string =
        process.env.REACT_APP_ENV && process.env.REACT_APP_ENV === 'dev'
          ? `${credentials.sUrl}/`
          : this.aliases[credentials.sAlias];

      this.stompClient[name] = Stomp.over(
        new (SockJS as any)(`${socketUrl}web-socket`, null, {
          transports: ['xhr-polling']
        })
      );
      this.stompClient[name].reconnect_delay = 0;
      this.stompClient[name].debug = () => {
      };
      if (process.env.REACT_APP_ENV && process.env.REACT_APP_ENV !== 'dev') {
        this.stompClient[name].debug = () => {
        }; // Убираем все сообщения из консоли
      }

      this.stompClient[name].connect(
        {},
        () => {
          if (!this.connections[name]) {
            this.connections[name] = {
              established: false,
              subscription: undefined
            };
          }

          this.connections[name].established = true;
          this.topicSubscriber(name, credentials.sTopic, onSubscribe);
        },
        () => {
          // Возможно нужно будет подключить сервис удаления cookies
        },
        () => {
          /** Обработка дисконнекта */
          this.reconnect(name, onSubscribe);
          // Возможно нужно будет подключить сервис удаления cookies
        }
      );
    }
  }

  /** Переподключение к сокетам
   * @params name - уникальное название соединения
   * @params onSubscribe - функция, которая вызывается при подписке
   * */
  private reconnect(name: string, onSubscribe: ISubscribeCallback): void {
    if (this.connections[name]) {
      this.connections[name].established = false;
      this.connections[name].subscription = undefined;

      if (!this.reconnectIsRunning) {
        this.reconnectIsRunning = true;

        const int = setInterval(() => {
          console.warn(this.reconnectMessage);
          sendNotification({
            sMessage: this.reconnectMessage,
            iStatus: 0
          });

          if (this.connections[name].established) {
            clearInterval(int);
          }

          this.connect(name, onSubscribe);
        }, 2000);
      }
    }
  }

  /** Подписка на топики
   * @params name - название топика
   * @params topic - полное название топика (/topic/<name>)
   * @params onSubscribe - функция, которая вызывается при подписке
   * */
  private topicSubscriber(
    name: string,
    topic: string,
    onSubscribe: ISubscribeCallback
  ): void {
    if (this.connections[name] && this.connections[name].established) {
      if (this.connections[name].subscription === undefined) {
        try {
          this.connections[name].subscription = this.stompClient[name].subscribe(
            topic,
            (data: IMessage) => {
              onSubscribe(data);
            }
          );
        } catch (e) {
          console.error(e);
        }
      } else {
        /** Переподписываемся с новым колбэклм */
        (this.connections[name].subscription as StompSubscription).unsubscribe();
        this.connections[name].subscription = this.stompClient[name].subscribe(
          topic,
          (data: IMessage) => {
            onSubscribe(data);
          }
        );
      }
    }
  }

  /** Отписка от топиков */
  public unsubscribe(name: string): void {
    console.log('Отписываемся от всех топиков');

    try {
      if (this.connections[name] && this.connections[name].subscription) {
        // @ts-ignore
        this.connections[name].subscription.unsubscribe();

        this.connections[name] = {
          established: false,
          subscription: undefined
        };
      }
    } catch (e) {
      console.error(e);
    }
  }

  /** Отключаем сокеты */
  public disconnect(): void {
    for (const name in this.stompClient) {
      this.unsubscribe(name);
      this.stompClient[name].forceDisconnect();
      this.stompClient[name].disconnect();
      this.stompClient[name].deactivate();
      delete this.stompClient[name];
    }
  }
}

/** Хук для подписки на сокет
 * @param flag - условие загрузки данных для запуска сокета
 * @param topic - название топика
 * @param callback - функция, которая будет вызвана при получении данных
 * */
export const useSocketSubscribe = (flag: boolean, topic: string, callback: (data: any) => void) => {
  useEffect(() => {
    if (flag) {
      _socket.connect(topic, (data: IMessage) => {
        callback(JSON.parse(data.body));
      }, true);
    }

  }, [callback, flag, topic]);
};


