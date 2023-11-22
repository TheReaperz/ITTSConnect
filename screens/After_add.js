import React from "react";
import { View } from "react-native";
import { Text, Button, Center, Image } from "native-base";

const AfterAddScreen = ({ navigation }) => {
    return(
        <View style={{ flex: 1 }}>
            <Center mt="150">
                <Image source={require('../assets/Icons/Illustration.png')} alt="">
                </Image>
            </Center>
            <Center mb='30' mt='5'>
                <Text mx='10' textAlign='center'>
                Congratulations </Text>
                <Text>Your job has been added</Text>
            </Center>
            <Button
            mx={60} mt={10}
            borderRadius={10}
                colorScheme="danger"
                onPress={() => navigation.navigate("AddJobScreen")}>
                MAKE ANOTHER JOB
            </Button>

            <Button 
            mb='30' mt='5' mx='60'
            borderRadius={10}
                colorScheme="danger"
                onPress={() => navigation.navigate("HomeCompanyScreen")} >
                BACK TO HOME
            </Button>
        </View>
    );
};

export default AfterAddScreen