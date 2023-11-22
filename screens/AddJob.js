import { View, ScrollView, TouchableOpacity} from 'react-native';
import { Heading, Container, HStack, Box, Button, TextArea, Text, Input, Checkbox, VStack, Image, } from 'native-base';
import TabsNavigationCompany from '../components/TabsNavigationCompany';

const AddJobScreen = ({ navigation }) => {
    return(
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} >
            <Container paddingTop={45}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeCompanyScreen')}>
                    <Image
                        source={require('../assets/Icons/back.png')} alt="Alternate Text"
                        style={{ width: 19, height: 15, marginLeft: 20 }}
                    />
                </TouchableOpacity>
            </Container>
             <HStack  space="2" alignItems="center">
                <Container  my={5} mx={2}>
                <Heading px={3}>Add a job</Heading>
                </Container>
            </HStack>
            <Container>
                <Text mt={2.5} mx='10' textAlign='center' bold fontSize="md">Job position</Text>
            </Container>
            <Box  alignItems="center">
                <Input mx={3} placeholder="Job position" w="300"  />
            </Box>
            
            <VStack space={5}>

            <Container>
                <Text mt={2.5} mx='10' textAlign='center' bold fontSize="md">Job type</Text>
            </Container>

                <Container mx={10}>
            
                <Checkbox value="test" colorScheme="danger" accessibilityLabel="This is a dummy checkbox" defaultIsChecked>
                Fulltime
                </Checkbox>

                <Checkbox value="test" colorScheme="danger" accessibilityLabel="This is a dummy checkbox" defaultIsChecked mt={5}>
                Intership
                </Checkbox>

                <Checkbox value="test" colorScheme="danger" accessibilityLabel="This is a dummy checkbox" defaultIsChecked mt={5}>
                Part-Time
                </Checkbox>

                <Checkbox value="test" colorScheme="danger" accessibilityLabel="This is a dummy checkbox" defaultIsChecked mt={5}>
                Freelance
                </Checkbox>

                <Checkbox value="test" colorScheme="danger" accessibilityLabel="This is a dummy checkbox" defaultIsChecked mt={5}>
                Assisten
                </Checkbox>

                </Container>
            </VStack>

            <Container>
                <Text mt={5} mx='10' textAlign='center' bold fontSize="md">Job location</Text>
            </Container>
            <Box  alignItems="center">
                <Input mx={3} placeholder="Job location" w="300"  />
            </Box>

            <Container>
                <Text mt={5} mx='10' textAlign='center' bold fontSize="md">Experience</Text>
            </Container>
            <Box  alignItems="center">
                <Input mx={3} placeholder="Experience" w="300"  />
            </Box>

            <Container>
                <Text mt={5} mx='10' textAlign='center' bold fontSize="md">Requirements</Text>
            </Container>
            <Box  alignItems="center">
                <Input mx={3} placeholder="Requirements" w="300"  />
            </Box>

            <Container>
                <Text mt={5} mx='10' textAlign='center' bold fontSize="md">Description</Text>
            </Container>
            <Box  alignItems="center" w="100%">
            <TextArea h={20} placeholder="Description" w="300" maxW="500"/>
            </Box>

            <Box w="40%">
            <Button
              mt={4}
              mb={4}
              mx={8}
              variant="subtle"
              colorScheme="green"
              size="lg"
              onPress={() => navigation.navigate("AfterAddScreen")}
            >
              <Text bold color={"black"}>POST</Text>
            </Button>
            </Box>
            </ScrollView>
            <TabsNavigationCompany navigation={navigation}/>
        </View>
    );
};

export default AddJobScreen;