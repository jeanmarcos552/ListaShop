import {indexList} from '../../../services/list';

export async function fetchData(dispath) {
  const {data, status} = await indexList();
  if (status === 200) {
    dispath({type: 'DATA', payload: data});
  }
  return data;
}
