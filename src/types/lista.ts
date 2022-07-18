import {ApiResponse} from './api';

export interface PayloadList extends ApiResponse {
  data: PropLista[];
}

export interface PropLista extends ApiResponse {
  data: {
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
    itens?: [];
    pivot?: {
      user_id: number;
      lista_id: number;
    };
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
  data: Array<ProviderItens>[];
}

export interface ProviderItens {
  id: number;
  name: string;
  itens: Array<ItemsReques>;
  total: number;
  info: {
    itens: number;
    user: number;
  };
}

export interface ItemsReques {
  id: number;
  name: string;
  itens: Array<any>;
  pivot: {
    qty: number;
    value: string;
    status: boolean;
    lista_id: number;
    itens_id: number;
  };
  total: number;
}
