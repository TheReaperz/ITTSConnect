import React from 'react';
import AuthNavigator from './AuthNavigator';
import UserNavigator from './UserNavigator';
import CompanyNavigator from './CompanyNavigator';
import { useAuth } from '../context/auth';

export default function RootNavigation() {
  const { user } = useAuth();
  if (!user) {
    return <AuthNavigator />;
  }
  if (user.role === 'users') {
    return <UserNavigator />;
  }
  if (user.role === 'company') {
    return <CompanyNavigator />;
  }
}