import {AxiosResponse} from 'axios';
import {PayloadIndexItem, PayloadItem, StoreItems} from '../../types/items';
import api, {displayError, mountErro} from '../api';

export async function indexItems(): Promise<AxiosResponse<PayloadIndexItem>> {
  try {
    const response = await api.get('/itens').catch(erro => {
      throw Error(mountErro(erro));
    });

    return response;
  } catch (error: unknown) {
    return displayError(error);
  }
}

export async function showItems(id: number): Promise<AxiosResponse<any>> {
  try {
    const response = await api.get(`/items/${id}`).catch(erro => {
      throw Error(mountErro(erro));
    });

    return response;
  } catch (error: unknown) {
    return displayError(error);
  }
}

export async function searchItemsByName(
  word: string,
): Promise<AxiosResponse<PayloadItem[]>> {
  try {
    const response = await api.get(`/itens-search?name=${word}`).catch(erro => {
      throw Error(mountErro(erro));
    });

    return response;
  } catch (error: unknown) {
    return displayError(error);
  }
}

export async function storeItem(
  body: StoreItems,
): Promise<AxiosResponse<string>> {
  try {
    const response = await api.post('/itens', body).catch(erro => {
      throw Error(mountErro(erro));
    });

    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    return displayError(error);
  }
}
