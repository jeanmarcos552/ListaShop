import {AxiosResponse} from 'axios';
import api, {displayError, mountErro} from '../api';

type PropDestroyItem = {
  lista_id: number;
  itens_id: number;
};
export async function removeItemToList({
  lista_id,
  itens_id,
}: PropDestroyItem): Promise<AxiosResponse<number>> {
  try {
    const response = await api
      .delete(`/itemsListRemove/${lista_id}/${itens_id}`)
      .catch(erro => {
        throw Error(mountErro(erro));
      });
    return response;
  } catch (error: unknown) {
    return displayError(error);
  }
}

type PropUpdateItem = {
  lista_id: number;
  itens_id: number;
  body: any;
};
export async function updateItems({
  lista_id,
  itens_id,
  body,
}: PropUpdateItem): Promise<AxiosResponse<number>> {
  try {
    const response = await api
      .put(`/updateItem/${lista_id}/${itens_id}`, {...body})
      .catch(erro => {
        throw Error(mountErro(erro));
      });
    return response;
  } catch (error: unknown) {
    return displayError(error);
  }
}

interface StoreItemToList {
  body: {
    lista: number;
    itens: {
      itens_id: number;
      qty: number;
    };
    user: number;
  };
}
export async function addItemToList({
  body,
}: StoreItemToList): Promise<AxiosResponse<number>> {
  try {
    const response = await api.post('/itemsListAdd', {...body}).catch(erro => {
      throw Error(mountErro(erro));
    });
    return response;
  } catch (error: unknown) {
    return displayError(error);
  }
}
