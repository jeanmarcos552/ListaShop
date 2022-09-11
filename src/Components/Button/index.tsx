import React from 'react';
import {RectButtonProperties} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {useTheme} from 'styled-components';

interface ButtonProps extends RectButtonProperties {
  children: string;
  onPress: (() => void) | undefined;
  loading?: boolean;
}

const ButtonDefault: React.FC<ButtonProps> = ({children, onPress, loading}) => {
  const theme = useTheme();
  return (
    <Button
      loading={loading}
      mode="contained"
      buttonColor={theme.colors.secondary}
      textColor="#fff"
      onPress={onPress}>
      {children}
    </Button>
  );
};

export default ButtonDefault;
