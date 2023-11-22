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

const JobDetail = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }} backgroundColor="white">
      <ScrollView>
        <TopBackButton navigation={navigation} />

        <JobDetailHeader
          title="UI/UX Design"
          company="Telkom Sigma"
          location="Surabaya"
          date="1 day ago"
          avatarSource={require("../assets/telkomsigma.png")}
        />

        <Box px={6} py={5}>
          <Heading paddingBottom={2}>Job Description</Heading>
          <Text textAlign="justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do dsa
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in asacafaw
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Box>

        <Box paddingTop="4">
          <VStack space="2" px={6}>
            <Heading>Requirements</Heading>
            <Text>• Sed ut perspiciatis unde omnis iste natus error sit.</Text>
            <Text>
              • Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur & adipisci velit.
            </Text>
            <Text>
              • Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit.
            </Text>
            <Text>
              • Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur
            </Text>
          </VStack>
        </Box>

        <Center py={8}>
          <Button
            w="50%"
            size="lg"
            variant="solid"
            colorScheme={"light"}
            bgColor={"error.500"}
          >
            Save
          </Button>
        </Center>
      </ScrollView>
      <TabsNavigation />
    </View>
  );
};

export default JobDetail;
