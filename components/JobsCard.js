import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Box, Image, Stack, Center, Text, HStack, Badge, Avatar } from 'native-base';

const JobsCard = ({ job, navigation }) => {

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        // Convert Firestore Timestamp to JavaScript Date object
        const date = timestamp.toDate();
        // Format the date as you prefer
        return date.toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handlePress = () => {
        navigation.navigate('JobDetail', { job: job });
    };

    return (
        <View>
            <TouchableOpacity onPress={handlePress}>
                <Box alignSelf="center" width="85%" height="150px" maxW="85%" maxH="150px" borderRadius="md" 
                        mt={5} px={5} py={3} 
                        _text={{
                        fontSize: "md",
                        fontWeight: "medium",
                        color: "warmGray.50",
                        letterSpacing: "lg"
                        }} bg={["#FD3E3E", "#FD3E3E"]}>
                            <Stack direction="row" mb="2.5" mt="4" space={3}>
                                <Center size="70" rounded="sm">
                                    <Avatar size={70} borderRadius={100} source={{uri: job.companyImage}} alt="Alternate Text" />
                                </Center>
                                <Box w="200" h="100" maxH="100" rounded="md" mt={-1} >
                                        <Box w="full" >
                                                <Text color={"#FFFFFF"} bold fontSize="xs">{job.jobPosition}</Text>
                                                <Text color={"#FFFFFF"} fontSize="xs">{`${job.companyName}, ${job.jobLocation}`}</Text>
                                        </Box>
                                        <Box w="full" mt={2}>
                                                    <HStack space={1} maxWidth={80}>
                                                    {job.requirement.map((req, index) => (
                                                        <Badge key={index} bg={'#D9D9D9'} rounded={10} variant={'solid'} alignSelf="center">
                                                    <Text bold bg={'#D9D9D9'} fontSize="2xs">{req}</Text>
                                                </Badge>
                                            ))}
                                                    </HStack>
                                        </Box>
                                        <Box w="full" mt={4}>
                                        <Text color={"#FFFFFF"} fontSize="xs">
                                            {formatDate(job.dateAdded)}
                                        </Text>
                                        </Box>
                                </Box>
                            </Stack>
                </Box>
            </TouchableOpacity>
        </View>
    );
};

export default JobsCard;
