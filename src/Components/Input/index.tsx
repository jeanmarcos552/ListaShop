import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';

import {TextInputProps} from 'react-native';
import {useField} from '@unform/core';

import {Container, InputText, IconText} from './style';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  size?: number;
}

interface InputRef {
  value: string;
}

interface inputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<inputRef, InputProps> = (
  {name, icon, size, ...rest},
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputElementRef.current.focus();
    },
  }));

  const {registerField, defaultValue = '', fieldName, error} = useField(name);
  const inputValueRef = useRef<InputRef>({value: defaultValue});

  const [isFocus, setIsFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleIsFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleIsFilled = useCallback(() => {
    setIsFocus(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

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
    <Container isFocus={isFocus} isErrored={!!error} size={size ? size : 100}>
      <IconText
        name={icon}
        size={20}
        color={error ? '#c53030' : isFocus || isFilled ? '#ff9000' : '#73be7f'}
      />

      <InputText
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor={
          error ? '#c53030' : isFocus || isFilled ? '#ff9000' : '#73be7f'
        }
        defaultValue={defaultValue}
        onFocus={handleIsFocus}
        onBlur={handleIsFilled}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
