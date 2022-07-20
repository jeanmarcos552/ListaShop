import {AxiosResponse} from 'axios';
import {
  INotification,
  PayloadNotification,
  StoreNotification,
} from '../../types/notifications';
import api, {displayError, mountErro} from '../api';

/**
 * @returns Promise
 */
export async function indexNotification(): Promise<
  AxiosResponse<PayloadNotification>
> {
  try {
    const response = await api.get('/notifications').catch(erro => {
      throw Error(mountErro(erro));
    });

    return response;
  } catch (error: unknown) {
    return displayError(error);
  }
}

/**
 * @returns Promise
 */
export async function storeNotification({
  body,
}: StoreNotification): Promise<AxiosResponse<INotification>> {
  try {
    const response = await api.post('/notifications', {...body}).catch(erro => {
      throw Error(mountErro(erro));
    });

    return response;
  } catch (error: unknown) {
    return displayError(error);
  }
}
