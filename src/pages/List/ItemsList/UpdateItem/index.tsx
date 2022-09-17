import React, {useCallback, useState} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
// import {Money, MoneyToFloat} from '../../../../../Utils/Mask';
import {ItemsRequest} from '../../../../types/list';
import {
  QuantidadeSymbol,
  TextStyle,
  TextTitle,
  TextValue,
  UpdateItemContainer,
  ViewContainer,
  ViewQuantidade,
} from './style';

interface PropUpdateItem {
  height: Animated.Value;
  handleOff: () => void;
  itemsChecked?: ItemsRequest[];
  setItemsChecked?: (value: ItemsRequest[]) => void;
  dados?: ItemsRequest | null;
}
export function UpdateItem({
  height,
  handleOff,
  itemsChecked,
  setItemsChecked,
  dados,
}: PropUpdateItem) {
  const [currentValue] = useState(dados?.pivot.value);
  const [currentQty] = useState(dados?.pivot.qty);

  const handleUpdateQuantidade = useCallback(() => {
    console.log(itemsChecked, setItemsChecked);
  }, [itemsChecked, setItemsChecked]);

  return (
    <UpdateItemContainer style={{height}}>
      <TextTitle>{dados?.name}</TextTitle>

      <ViewQuantidade>
        <ViewContainer>
          <TouchableOpacity onPress={() => null}>
            <QuantidadeSymbol name="plus" size={50} color="#013DB4" />
          </TouchableOpacity>
          <TextStyle>{currentQty}</TextStyle>

          <TouchableOpacity onPress={() => null}>
            <QuantidadeSymbol name="plus" size={50} color="#013DB4" />
          </TouchableOpacity>
        </ViewContainer>
        <TextValue
          keyboardType="numeric"
          value={currentValue}
          // onChangeText={(text: string) => setCurrentValue(parseFloat(text))}
        />
      </ViewQuantidade>

      <View
        style={{
          marginTop: 30,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignContent: 'center',
          paddingHorizontal: 25,
        }}>
        <TouchableOpacity onPress={handleOff}>
          <Text>Fechar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleUpdateQuantidade()}>
          <Text>salvar</Text>
        </TouchableOpacity>
      </View>
    </UpdateItemContainer>
  );
}
