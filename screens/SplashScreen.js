import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('GetStarted');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/SplashScreen.png')}
        style={styles.image}
      />
      <Text style={styles.header}>Career Connect</Text>
      <Text style={styles.paragraph}>
      Explore all the most exciting job roles based on your interest and study major.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 100,
  },
  header: {
    fontSize: 32,
    textAlign: 'left',
    paddingRight: 120,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ff0000',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'left',
    paddingHorizontal: 20,
  },
});

export default SplashScreen;