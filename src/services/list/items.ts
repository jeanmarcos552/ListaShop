import {AxiosResponse} from 'axios';
import {PayloadIndexItem, PayloadItem} from '../../types/items';
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
