import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Container, Heading, Button, Text } from 'native-base';
import Checkbox from '../components/CheckboxFilter';
import RadioButton from '../components/RadioButtonFilter';
import TabsNavigation from '../components/TabsNavigation';

const FilterScreen = ({ navigation }) => {

    const handleSubmit = () => {
        
    };

    return (
        <View style={{ flex: 1 }}>
            <Container paddingTop={45}>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Image
                        source={require('../assets/Icons/back.png')}
                        style={{ width: 19, height: 15, marginLeft: 20 }}
                    />
                </TouchableOpacity>
            </Container>
            <Container paddingTop={25}>
                <Heading px={30}>Job Filter</Heading>
            </Container>
            <ScrollView style={{ flex: 1 }}>
                <Checkbox />
                <RadioButton />
            </ScrollView>
            <Button
              mt={4}
              mb={4}
              mx={8}
              rounded={15}
              colorScheme="danger"
              size="md"
              onPress={handleSubmit}
            >
              <Text bold color={"white"}>APPLY FILTER</Text>
            </Button>
            <TabsNavigation />
        </View>
    );
};

export default FilterScreen;
