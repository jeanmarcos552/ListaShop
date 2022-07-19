export function deleteList(dispatch, payload) {
  console.log(payload, dispatch);

  dispatch({type: 'REMOVE_ITEM_TO_ITEM', payload});
}
