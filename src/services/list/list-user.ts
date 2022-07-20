import {AxiosResponse} from 'axios';
import {StoreUserToList} from '../../types/user';
import api, {displayError, mountErro} from '../api';

export async function storeUserList({
  body,
}: StoreUserToList): Promise<AxiosResponse<number>> {
  try {
    const response = await api.post('/addUserToList', {...body}).catch(erro => {
      throw Error(mountErro(erro));
    });
    return response;
  } catch (error: unknown) {
    return displayError(error);
  }
}
