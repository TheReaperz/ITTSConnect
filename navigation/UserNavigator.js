import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import SearchScreen from '../screens/SearchScreen';
import FilterScreen from '../screens/FilterScreen';
import UserProfile from '../screens/userprofile.js';
import JobDetail from '../screens/jobdetail.js';
import HomeUserScreen from '../screens/HomeUser.js';
import LoginScreen from '../screens/LoginScreen.js';

const Stack = createNativeStackNavigator();

const UserNavigator = () => {
    return (
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeUserScreen">
                <Stack.Screen name="HomeUserScreen" component={HomeUserScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
                <Stack.Screen name="FilterScreen" component={FilterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
                <Stack.Screen name="JobDetail" component={JobDetail} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              </Stack.Navigator>
          </NavigationContainer>
      </NativeBaseProvider>
    );
};

export default UserNavigator;