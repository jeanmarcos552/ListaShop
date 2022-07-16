import React from 'react';
import {AuthProvider} from './auth';

const AppProvider: React.FC<any> = ({children}) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
