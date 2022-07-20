import {deleteList} from '../../../services/lista';

export async function removeList(dispatch, payload): Promise<string> {
  const data = await deleteList(payload);
  dispatch({type: 'REMOVE_ITEM_TO_ITEM', payload});
  return data;
}
