import React from 'react';
import { View } from 'react-native';
import { Text, Button, Center, Image } from 'native-base';

const GetStartedScreen = ({ navigation }) => {
  return (
    <View>
        <Center mt="100">
          <Image source={{
          uri: "https://wallpaperaccess.com/full/317501.jpg"
        }} alt="Alternate Text" size="xl" />
        </Center>
        <Center mb="40" mt="20">
            <Text mx="10" textAlign="center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam.</Text>
          </Center>
            <Button
              mt={8}
              mx={60}
              variant={"outline"}
              rounded={18}
              colorScheme="danger"
              size="md"
              onPress={() => navigation.navigate('Register')}
            >
              Register
            </Button>
            <Button
              mt={2}
              mx={60}
              rounded={18}
              colorScheme="danger"
              size="md"
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Button>
              <Center mx="20">
              <Text fontSize="xs" textAlign="center">By signin or logging in, I do accept
Terms of Services and Privacy Policy.</Text>
              </Center>
    </View>
  );
};

export default GetStartedScreen;
