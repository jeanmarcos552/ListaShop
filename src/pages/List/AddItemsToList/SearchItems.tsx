import React, {useCallback, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  ButtonAddNewCategory,
  HeaderSearch,
  InputText,
  LabelText,
  TextButton,
  TextInputSugest,
} from './style';

type PropsSearchItems = {
  searchRef: React.RefObject<any>;
  handleSearchItens: Function;
  navigation: any;
  isConclude: boolean;
  label?: string;
};
export function SearchItems({
  searchRef,
  handleSearchItens,
  navigation,
  isConclude,
  label,
}: PropsSearchItems) {
  const [value, setValue] = useState<string>();
  const [isFocus, setIsFocus] = useState(true);

  const handleIsFocus = useCallback(() => {
    setIsFocus(false);
  }, []);

  const handleIsFilled = useCallback(() => {
    setIsFocus(true);
  }, []);

  return (
    <HeaderSearch>
      {label && <LabelText>{label}</LabelText>}
      <TextInputSugest isFocus={isFocus} isErrored={false}>
        {/* <Icon name="search" size={15} color={isFocus ? '#01ac73' : '#ff9000'} /> */}
        <InputText
          isErrored={false}
          isFocus={isFocus}
          ref={searchRef}
          placeholder="pesquisar..."
          value={value}
          placeholderTextColor={isFocus ? '#01ac73' : '#ff9000'}
          onChangeText={(text: string) => {
            handleSearchItens(text);
            setValue(text);
          }}
          onFocus={handleIsFocus}
          onBlur={handleIsFilled}
        />
        {value ? (
          <ButtonAddNewCategory
            onPress={() => {
              setValue('');
              handleSearchItens('');
            }}>
            <TextButton>Limpar</TextButton>
          </ButtonAddNewCategory>
        ) : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <TextButton>{isConclude ? 'Concluir' : 'Voltar'}</TextButton>
          </TouchableOpacity>
        )}
      </TextInputSugest>
    </HeaderSearch>
  );
}
