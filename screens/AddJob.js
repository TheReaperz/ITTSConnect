import { View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { Heading, Container, HStack, Box, Button, TextArea, Text, Input, Checkbox, VStack, Image, Radio } from 'native-base';
import TabsNavigationCompany from '../components/TabsNavigationCompany';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from 'react';
import { useAuth } from '../context/auth';

const AddJobScreen = ({ navigation }) => {

    const { user } = useAuth();
    const [jobPosition, setJobPosition] = useState('');
    const [jobType, setJobType] = useState([]);
    const [jobLocation, setJobLocation] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [requirements, setRequirements] = useState(['']);
    const [description, setDescription] = useState('');

    const showConfirmDialog = () => {
        if (!jobPosition || !jobType.length || !jobLocation || !experienceLevel || requirements.some(r => r === '') || !description) {
            Alert.alert("Missing Information", "Please fill in all the fields.");
            return;
        }
    
        return Alert.alert(
            "Confirm Submission",
            "Are you sure you want to submit this job posting?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        handleSubmit();
                    },
                },

                {
                    text: "No",
                },
            ],
        );
    };
    
    

    const handleRequirementChange = (text, index) => {
        const newRequirements = [...requirements];
        newRequirements[index] = text;
        setRequirements(newRequirements);
    };

    const addRequirementInput = () => {
        if (requirements.length < 5) {
            setRequirements([...requirements, '']);
        } else {
            alert('Max 5 requirements');
        }
    };
    

    const handleSubmit = async () => {
        try {
            const docRef = await addDoc(collection(db, "jobs"), {
                jobPosition: jobPosition,
                companyImage: user.companyImage,
                companyEmail: user.email,
                companyName: user.fullName,
                jobType: jobType,
                jobLocation: jobLocation,
                experience: experienceLevel,
                requirement: requirements.filter(r => r !== ''),
                jobDescription: description,
                dateAdded: new Date(),
            });
            console.log("Document written with ID: ", docRef.id);
            navigation.navigate('AfterAddScreen');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

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
                <Input mx={3} placeholder="Job position" w="300" 
                value={jobPosition} 
                onChangeText={text => setJobPosition(text)}
                />
            </Box>
            
            <VStack space={5}>

            <Container>
                <Text mt={2.5} mx='10' textAlign='center' bold fontSize="md">Job type</Text>
            </Container>

                <Container mx={10}>
            
                <Box alignItems="left">
                    <Radio.Group
                        name="jobType"
                        accessibilityLabel="Job Type"
                        value={jobType}
                        onChange={nextValue => setJobType(nextValue)}
                    >
                        <Radio value="Fulltime" my={1} colorScheme="danger">Fulltime</Radio>
                        <Radio value="Internship" my={1} colorScheme="danger">Internship</Radio>
                        <Radio value="Part-Time" my={1} colorScheme="danger">Part-Time</Radio>
                        <Radio value="Freelance" my={1} colorScheme="danger">Freelance</Radio>
                        <Radio value="Assistant" my={1} colorScheme="danger">Assistant</Radio>
                    </Radio.Group>
                </Box>

                </Container>
            </VStack>

            <Container>
                <Text mt={5} mx='10' textAlign='center' bold fontSize="md">Job location</Text>
            </Container>
            <Box  alignItems="center">
                <Input mx={3} placeholder="Job location" w="300"
                value={jobLocation}
                onChangeText={text => setJobLocation(text)}
                />
            </Box>

            <Container>
            <Text mt={5} mx='10' textAlign='center' bold fontSize="md">Experience</Text>
            </Container>
                <Box alignItems="left" marginLeft={10}>
                    <Radio.Group
                        name="experienceLevel"
                        accessibilityLabel="Experience Level"
                        value={experienceLevel}
                        onChange={nextValue => setExperienceLevel(nextValue)}
                        mx={3}
                    >
                        <Radio value="Fresh Graduate" my={1} colorScheme="danger">Fresh Graduate</Radio>
                        <Radio value="1 Year" my={1} colorScheme="danger">1 Year</Radio>
                        <Radio value="3 Years" my={1} colorScheme="danger">3 Years</Radio>
                    </Radio.Group>
                </Box>

                <Container>
                <Text mt={5} mx='10' textAlign='center' bold fontSize="md">Requirements</Text>
                </Container>
                <Box alignItems="left" marginLeft={7}>
                <VStack space={3} mx={3}>
                    {requirements.map((requirement, index) => (
                        <Input 
                            mx={3}
                            key={index}
                            placeholder={`Requirement ${index + 1}`} 
                            value={requirement}
                            onChangeText={text => handleRequirementChange(text, index)}
                        />
                    ))}
                    {requirements.length < 5 && (
                        <Button marginLeft={3} center maxWidth="320" colorScheme="danger" onPress={addRequirementInput}>
                            <Text color="white">Add Another Requirement</Text>
                        </Button>
                    )}
                </VStack>
                </Box>

            <Container>
                <Text mt={5} mx='10' textAlign='center' bold fontSize="md">Description</Text>
            </Container>
            <Box  alignItems="center" w="100%">
            <TextArea h={20} placeholder="Description" w="300" maxW="500"
            value={description}
            onChangeText={text => setDescription(text)}
            />
            </Box>

            <Box w="40%">
            <Button
                mt={4}
                mb={4}
                mx={8}
                variant={'subtle'}
                colorScheme="green"
                size="lg"
                onPress={showConfirmDialog}
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