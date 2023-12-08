import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import CompanyProfile from '../screens/companyprofile.js';
import AfterAddScreen from '../screens/After_add.js';
import AddJobScreen from '../screens/AddJob.js';
import HomeCompanyScreen from '../screens/HomeCompany.js';

const Stack = createNativeStackNavigator();

const CompanyNavigator = () => {
    return (
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="CompanyProfile">
                <Stack.Screen name="CompanyProfile" component={CompanyProfile} options={{ headerShown: false }} />
                <Stack.Screen name="HomeCompanyScreen" component={HomeCompanyScreen} options={{ headerShown: true }} />
                <Stack.Screen name="AddJobScreen" component={AddJobScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AfterAddScreen" component={AfterAddScreen} options={{ headerShown: false }} />
              </Stack.Navigator>
          </NavigationContainer>
      </NativeBaseProvider>
    );
};

export default CompanyNavigator;

