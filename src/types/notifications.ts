import {ApiResponse} from './api';

export type StoreNotification = {
  body: {
    description: string;
    user_send: number;
    user_receiver: string;
    lista: number;
  };
};

export type INotification = {
  description: string;
  user_send: number;
  user_receiver: number;
  lista: number;
  id: number;
};

export interface PayloadNotification extends ApiResponse {
  data: INotification[];
}
