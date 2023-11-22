import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import SplashScreen from './screens/SplashScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import GetStartedScreen from './screens/GetStartedScreen';
import SearchScreen from './screens/SearchScreen';
import FilterScreen from './screens/FilterScreen';
import CompanyProfile from './screens/companyprofile.js';
import UserProfile from './screens/userprofile.js';
import JobDetail from './screens/jobdetail.js';
import HomeUserScreen from './screens/HomeUser.js';
import AfterAddScreen from './screens/After_add.js';
import AddJobScreen from './screens/AddJob.js';
import HomeCompanyScreen from './screens/HomeCompany.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeCompanyScreen">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="GetStarted" component={GetStartedScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Filter" component={FilterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CompanyProfile" component={CompanyProfile} options={{ headerShown: false }} />
          <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
          <Stack.Screen name="JobDetail" component={JobDetail} options={{ headerShown: false }} />
          <Stack.Screen name="HomeUserScreen" component={HomeUserScreen} options={{ headerShown: true }} />
          <Stack.Screen name="HomeCompanyScreen" component={HomeCompanyScreen} options={{ headerShown: true }} />
          <Stack.Screen name="AddJobScreen" component={AddJobScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AfterAddScreen" component={AfterAddScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}