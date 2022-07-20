import {storeList} from '../../../services/list';

export async function createNewList(dispatch, payload) {
  const {data} = await storeList({body: {...payload, category_id: 1}});
  dispatch({type: 'ADD_ITEM_TO_LIST', payload: data});

  return data;
}
