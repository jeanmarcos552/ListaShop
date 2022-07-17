import {AxiosResponse} from 'axios';

export interface ResponseCategory {
  data: any;
  status: number;
}

export interface Category {
  name: string;
  updated_at: string;
  created_at: string;
  id: number;
}

export interface StoreCategory {
  body: {
    name: string;
    cat_pai?: number;
  };
}

export interface ResponseStoreCategory extends AxiosResponse {
  data: Category;
}
