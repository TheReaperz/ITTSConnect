import React from "react";
import { ScrollView, View, TouchableOpacity, Image } from "react-native";
import TopBackButton from "../components/backtop_btn";
import JobDetailHeader from "../components/jobdetail_haeader";
import {
  Text,
  Button,
  VStack,
  Box,
  Heading,
  Center,
} from "native-base";
import TabsNavigation from "../components/TabsNavigation";
import { Linking } from 'react-native';

const JobDetail = ({ route, navigation }) => {
  const { job } = route.params;

  const handleApplyPress = () => {
    let email = job.companyEmail; // Replace with actual email field
    let subject = `Application for ${job.jobPosition}`;
    let body = 'Dear Hiring Manager,\n\nI am writing to apply for the position...';

    let url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
};

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

  return (
    <View style={{ flex: 1 }} backgroundColor="white">
      <ScrollView>
        <TopBackButton navigation={navigation} />

        <JobDetailHeader
          title={job.jobPosition}
          company={job.companyName}
          location={job.jobLocation}
          date={formatDate(job.dateAdded)}
          avatarSource={{ uri: job.companyImage }}
        />

        <Box px={6} py={5}>
          <Heading paddingBottom={2}>Job Description</Heading>
          <Text textAlign="justify">
            {job.jobDescription}
          </Text>
        </Box>

        <Box paddingTop="4">
          <VStack space="2" px={6}>
            <Heading>Experience Requirements</Heading>
              <Text pb={6}>• {job.experience} .</Text>
            <Heading>Skill Requirements</Heading>
            {job.requirement.map((req, index) => (
            <Text >• {req}</Text>
            ))}
          </VStack>
        </Box>

        <Center py={10}>
          <Button on onPress={handleApplyPress}
            w="50%"
            size="lg"
            variant="solid"
            colorScheme={"light"}
            bgColor={"error.500"}
          >
            Apply
          </Button>
        </Center>
      </ScrollView>
      <TabsNavigation navigation={navigation} />
    </View>
  );
};

export default JobDetail;
