import React, {useCallback, useState} from 'react';
import {Alert, View} from 'react-native';
import ButtonDefault from '../../../../Components/Button';
import DialogComponent from '../../../../Components/Dialog';
import {storeItem} from '../../../../services/list/items';
import {UnidadeStoreItem} from '../../../../types/items';
import {
  IconPlus,
  Container,
  Text,
  TextBold,
  ContainerUnidade,
  TextUnidade,
} from './style';

interface PropCreateNewItem {
  value: string;
  callback: Function;
}
export function CreateNewItem({value, callback}: PropCreateNewItem) {
  const [showModal, setShowModal] = useState(false);
  const [unidade, setUnidade] = useState<UnidadeStoreItem>('UN');

  const handleCreateNewItem = useCallback(async () => {
    const resp = await storeItem({
      name: value,
      un: unidade,
    });

    setShowModal(false);
    callback(value);
    setTimeout(() => {
      Alert.alert('Atenção', String(resp));
    }, 1000);
  }, [callback, unidade, value]);

  return (
    <>
      {value && (
        <Container onPress={() => setShowModal(true)}>
          <Text>
            Adicionar: <TextBold> {value} </TextBold>á lista?
          </Text>
          <IconPlus name="plus" size={20} />
        </Container>
      )}

      <DialogComponent
        visible={showModal}
        setVisible={setShowModal}
        title="Qual é a unidade de medida do Item?">
        <>
          {['UN', 'KG', 'PAR', 'PCT'].map((un: any) => (
            <ContainerUnidade key={un} onPress={() => setUnidade(un)}>
              <TextUnidade active={un === unidade}>{un}</TextUnidade>
            </ContainerUnidade>
          ))}
          <View style={{height: 10}} />
          <ButtonDefault onPress={handleCreateNewItem}>
            Salvar Item
          </ButtonDefault>
        </>
      </DialogComponent>
    </>
  );
}
