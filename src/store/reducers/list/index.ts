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
};

export const initalList: PropReducer = {
  data: [],
  share: false,
  newList: false,
  refreshing: false,
};

export function reducerList(state: any, action: any) {
  switch (action.type) {
    case 'DATA':
      return {...state, data: action.payload};
  }
}
