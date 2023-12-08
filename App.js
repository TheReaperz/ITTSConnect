import * as React from 'react';
import RootNavigator from './navigation/RootNavigator';
import { AuthProvider } from './context/auth';
export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}