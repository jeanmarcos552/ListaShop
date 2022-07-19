import {PayloadList} from '../../../types/lista';

type PropReducer = {
  data: PayloadList[];
  share: boolean;
  newList: boolean;
  refreshing: boolean;
  seeList?: {
    id: number;
    title: string;
  };
  itemToDelete?: number;
};

export const initalList: PropReducer = {
  data: [],
  share: false,
  newList: false,
  refreshing: false,
};

function filterData(state, action) {
  const copyData = {...state.data};
  copyData.data = state.data.data.filter(item => item.id !== action.payload);
  return copyData;
}

export function reducerList(state: any, action: any) {
  switch (action.type) {
    case 'DATA':
      return {...state, data: action.payload};
    case 'DELETE_LIST':
      return {
        ...state,
        itemToDelete: action.payload,
      };
    case 'REMOVE_ITEM_TO_ITEM':
      return {
        ...state,
        data: filterData(state, action),
        itemToDelete: null,
      };
  }
}
