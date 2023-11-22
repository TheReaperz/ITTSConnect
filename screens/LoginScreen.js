import React from 'react';
import { View } from 'react-native';
import { FormControl, Input, Heading, Text, Button, Center, Box, Link } from 'native-base';

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <Center >
        <Heading paddingTop="100">Login to Your Account!</Heading>
        <Text fontSize="xs">Lorem ipsum dolor sit amet, consectetur</Text>

          <FormControl isRequired isInvalid paddingTop="90" paddingX="10">
            <FormControl.Label>Email Address</FormControl.Label>
            <Input p={2} placeholder="Email" />
            <FormControl.Label>Password</FormControl.Label>
            <Input p={2} placeholder="Password" />
            <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
            <Button
              mt={8}
              mx={8}
              rounded={15}
              colorScheme="danger"
              size="md"
              onPress={() => navigation.navigate('Search')}
            >
              Login
            </Button>
          </FormControl>
          <Box alignItems="center" paddingTop="210">
            <Text mx="16"> Log In to My Account</Text>
            <Text mx="16">
              Don't have an account?{" "}
              <Link onPress={() => navigation.navigate('Register')} isExternal _text={{
              color: "red.400"
            }} mt={-0.5} _web={{
              mb: -2
            }}>
                Sign Up
              </Link>
            </Text>
        </Box>;
      </Center>
    </View>
  );
};

export default LoginScreen;
