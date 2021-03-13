import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';

import {Title, Container} from './style';

const SignUp: React.FC = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}
      enabled>
      <ScrollView
        contentContainerStyle={{flex: 1}}
        keyboardShouldPersistTaps="handled">
        <Container>
          <View>
            <Title>SignUp</Title>
          </View>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
