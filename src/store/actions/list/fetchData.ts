export function fetchData(dispath) {
  // const {data, status} = await indexList();
  // if (status === 200) {
  //   setList(data);
  //   return data;
  // }

  const payload = {
    current_page: 1,
    data: [
      {
        id: 2,
        name: 'Porto Seguro',
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
      },
      {
        id: 3,
        name: 'Porto Seguro',
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
      },
      {
        id: 4,
        name: 'Porto Seguro',
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
      },
      {
        id: 5,
        name: 'Porto Seguro',
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
      },
      {
        id: 6,
        name: 'Porto Seguro',
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
      },
      {
        id: 7,
        name: 'Porto Seguro',
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
      },
    ],
    first_page_url: 'http://192.168.100.23:8080/api/lista?page=1',
    from: 1,
    last_page: 1,
    last_page_url: 'http://192.168.100.23:8080/api/lista?page=1',
    links: [
      {
        url: null,
        label: '&laquo; Previous',
        active: false,
      },
      {
        url: 'http://192.168.100.23:8080/api/lista?page=1',
        label: '1',
        active: true,
      },
      {
        url: null,
        label: 'Next &raquo;',
        active: false,
      },
    ],
    next_page_url: null,
    path: 'http://192.168.100.23:8080/api/lista',
    per_page: 10,
    prev_page_url: null,
    to: 1,
    total: 1,
  };

  return dispath({type: 'DATA', payload});
}
