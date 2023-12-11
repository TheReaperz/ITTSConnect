import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { FormControl, Input, Heading, Text, Button, Center, Box, Link } from 'native-base';
import { db } from '../firebase';
import { collection, where, query, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'crypto-js/md5';
import { useAuth } from '../context/auth';

const LoginScreen = ({ navigation }) => {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('bintangsatrio5@gmail.com');
  const [password, setPassword] = useState('12345');
  const [isInvalid, setIsInvalid] = useState(false);

  const handleLogin = async () => {
    try {
      const hashedPassword = md5(password).toString();

      const userQuery = query(
        collection(db, 'users'),
        where('email', '==', email),
        where('password', '==', hashedPassword)
      );

      const userDocs = await getDocs(userQuery);

      if (userDocs.docs.length === 1) {
        const user = userDocs.docs[0].data()
        console.log(user)
        await signIn(user);
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
        <Heading paddingTop="100">ITTS Career Connect</Heading>
        <Text fontSize="xs">Login</Text>

        <FormControl isRequired paddingTop="90" paddingX="10" isInvalid={isInvalid}>
          <FormControl.Label>Email Address</FormControl.Label>
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
          <Text mx="16"> Log In to My Account</Text>
        </Box>
      </Center>
    </View>
  );
};

export default LoginScreen;
