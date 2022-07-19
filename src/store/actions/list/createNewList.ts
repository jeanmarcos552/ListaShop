export function createNewList(dispatch, payload) {
  console.log(dispatch, payload);

  const newData = {
    id: 10,
    ativo: true,
    created_at: '2022-07-17T15:49:10.000000Z',
    updated_at: '2022-07-17T15:49:10.000000Z',
    created_by: 3,
    category_id: 1,
    user: [
      {
        id: 3,
        name: 'Simone Lopes',
        email: 'jean.silva552@outlook.com',
        email_verified_at: null,
        created_at: '2022-07-16T22:34:43.000000Z',
        updated_at: '2022-07-16T22:34:43.000000Z',
        pivot: {
          lista_id: 2,
          user_id: 3,
        },
      },
    ],
    itens: [],
    pivot: {
      user_id: 3,
      lista_id: 2,
    },
    ...payload,
  };
  dispatch({type: 'ADD_ITEM_TO_LIST', payload: newData});
}
