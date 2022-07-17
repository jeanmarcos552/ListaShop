import {
  ResponseCategory,
  ResponseStoreCategory,
  StoreCategory,
} from '../../types/category';
import api, {displayError, mountErro} from '../api';

/**
 * Lista todas as Categorias
 * @returns Promise
 */
export async function fetchIndexCategory(): Promise<ResponseCategory> {
  try {
    const response = await api.get('/category').catch(erro => {
      throw Error(mountErro(erro));
    });

    return response;
  } catch (error: unknown) {
    return displayError(error);
  }
}

/**
 * Salva uma nova Categorias
 * @returns Object
 */
export async function storeCategory({
  body,
}: StoreCategory): Promise<ResponseStoreCategory> {
  try {
    const response = await api.post('/category', {...body}).catch(erro => {
      throw Error(mountErro(erro));
    });

    return response;
  } catch (error: unknown) {
    return displayError(error);
  }
}
