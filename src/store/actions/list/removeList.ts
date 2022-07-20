import {deleteList} from '../../../services/list';

export async function removeList(dispatch, payload): Promise<string> {
  const data = await deleteList(payload);
  dispatch({type: 'REMOVE_ITEM_TO_ITEM', payload});
  return data;
}
