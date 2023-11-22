import React from 'react';
import { View } from 'react-native';
import { FormControl, Input, Heading, Text, Button, Center, Box, Link } from 'native-base';

const RegisterScreen = ({ navigation }) => {
  return (
    <View>
      <Center >
        <Heading paddingTop="100">Create New Account!</Heading>
        <Text fontSize="xs">Lorem ipsum dolor sit amet, consectetur</Text>

          <FormControl isRequired isInvalid paddingTop="90" paddingX="10" variant="outline">
            <FormControl.Label>Profile Name</FormControl.Label>
            <Input p={2} placeholder="Profile Name" />
            <FormControl.Label>Email Address</FormControl.Label>
            <Input p={2} placeholder="Email" />
            <FormControl.Label>Password</FormControl.Label>
            <Input p={2} placeholder="Password" />
            <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
            <Button
              mt={4}
              mx={8}
              rounded={15}
              colorScheme="danger"
              size="md"
              onPress={() => {
                console.log('hello');
              }}
            >
              Start Your Career
            </Button>
          </FormControl>
          <Box alignItems="center" paddingTop="140">
            <Text mx="16"> Sign In New Account</Text>
            <Text mx="16">
              Already have an account?{" "}
              <Link onPress={() => navigation.navigate('Login')} isExternal _text={{
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

export default RegisterScreen;
