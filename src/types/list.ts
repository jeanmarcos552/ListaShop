import {ApiResponse} from './api';

export interface PayloadList extends ApiResponse {
  data: PropLista[];
}

export interface PropLista {
  id: number;
  name: string;
  ativo: true;
  created_at: string;
  updated_at: string;
  created_by: number;
  category_id: number;
  user?: [
    {
      id: number;
      name: string;
      email: string;
      email_verified_at: null;
      created_at: string;
      updated_at: string;
      pivot: {
        lista_id: number;
        user_id: number;
      };
    },
  ];
  itens?: ItemsRequest[];
  pivot?: {
    user_id: number;
    lista_id: number;
  };
}

export interface StoreList {
  body: {
    name: string;
    category_id: 1;
  };
}

export interface UpdateList extends StoreList {
  id: string;
}

export interface ProviderRequest {
  current_page: number;
  data: Array<ProviderItems>[];
}

export interface ProviderItems {
  id: number;
  name: string;
  itens: Array<ItemsRequest>;
  total: number;
  info: {
    itens: number;
    user: number;
  };
}

export interface ItemsRequest {
  id: number;
  name: string;
  itens: Array<ProviderItemsList>;
  pivot: {
    qty: number;
    value: string;
    status: boolean;
    lista_id: number;
    itens_id: number;
  };
  total: number;
  ativo: boolean;
  created_at?: string;
  un: string;
  updated_at: string;
}

export interface ProviderItemsList {
  pivot: {
    qty: number;
    value: string;
    status: boolean;
    lista_id: number;
    itens_id: number;
  };
}

export interface FiltroItensList {
  status?: boolean;
  itens?: boolean;
}
