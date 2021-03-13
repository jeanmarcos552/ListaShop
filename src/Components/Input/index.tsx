import React, {useEffect, useRef} from 'react';

import {TextInputProps} from 'react-native';
import {useField} from '@unform/core';

import {Container, InputText, IconText} from './style';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputRef {
  value: string;
}

const Input: React.FC<InputProps> = ({name, icon, ...rest}) => {
  const inputElementRef = useRef<any>(null);

  const {registerField, defaultValue = '', fieldName, error} = useField(name);
  const inputValueRef = useRef<InputRef>({value: defaultValue});

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({text: value});
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <IconText name={icon} size={20} color="#73be7f" />

      <InputText
        secureTextEntry={name === 'password'}
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#73be7f"
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default Input;
