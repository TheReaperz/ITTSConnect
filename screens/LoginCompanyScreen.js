import React, { useState } from 'react';
import { View } from 'react-native';
import { FormControl, Input, Heading, Text, Button, Center, Box, Link } from 'native-base';
import { db } from '../firebase';
import { collection, where, query, getDocs } from 'firebase/firestore';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const handleLogin = async () => {
    try {
      const userQuery = query(collection(db, 'users'), where('email', '==', email), where('password', '==', password));
      const userDocs = await getDocs(userQuery);
      if (userDocs.docs.length === 1) {
        navigation.navigate('SearchScreen');
      } else {
        setIsInvalid(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Center>
        <Heading paddingTop="100">Login to Your Account!</Heading>
        <Text fontSize="xs">Company</Text>

        <FormControl isRequired paddingTop="90" paddingX="10" isInvalid={isInvalid}>
          <FormControl.Label>Company Email Address</FormControl.Label>
          <Input
            p={2}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <FormControl.Label>Password</FormControl.Label>
          <Input
            p={2}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          {isInvalid && (
            <FormControl.ErrorMessage>
              Invalid email or password.
            </FormControl.ErrorMessage>
          )}
          <Button
            mt={8}
            mx={8}
            rounded={15}
            colorScheme="danger"
            size="md"
            onPress={handleLogin}
          >
            Login
          </Button>
        </FormControl>
        <Box alignItems="center" paddingTop="210">
          <Text mx="16"> Log In As Company</Text>
          <Text mx="16">
            Regular User?{' '}
            <Link
              onPress={() => navigation.navigate('Login')}
              isExternal
              _text={{
                color: 'red.400',
              }}
              mt={-0.5}
              _web={{
                mb: -2,
              }}
            >
              Sign In As User
            </Link>
          </Text>
        </Box>
      </Center>
    </View>
  );
};

export default LoginScreen;
