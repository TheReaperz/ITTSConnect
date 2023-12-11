import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import SplashScreen from '../screens/SplashScreen.js';
import LoginScreen from '../screens/LoginScreen.js';
import LoginCompanyScreen from '../screens/LoginCompanyScreen.js';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Splash">
                    <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="LoginCompany" component={LoginCompanyScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
};

export default AuthNavigator;