import React, { useContext, useState, useEffect } from "react";
import { ScrollView, View, } from "react-native";
import ProfileBox from "../components/profilebox";
import { Input } from "native-base";
import {
  Text,
  Button,
  VStack,
  Box,
  HStack,
  TextArea,
  Center,
  Image,
  Badge,
} from "native-base";
import TabsNavigation from "../components/TabsNavigation";
import { useAuth } from "../context/auth";

const UserProfile = ({ navigation }) => {
  const { user, signOut } = useAuth();
 
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <View style={{ flex: 1 }} backgroundColor="white">
      <ScrollView>
        <ProfileBox
          title={user.fullName}
          subtitle={user.location}
            avatarSource={{uri: user.profilePicture}}
          onPressChangeImage={() => console.log("ChangeImage")}
          onPressLogout={handleLogout}
        />

        <Box paddingTop="4">
          <VStack space="2" px={6}>
            <VStack space={3}>
                <Text fontSize="md" bold>
                  Full Name
                </Text>
              <Input variant="outline" placeholder="Enter a full name" value={user.fullName}/>
            </VStack>
            <VStack space={3}>
                <Text fontSize="md" bold>
                Date of Birth
                </Text>
              <Input variant="outline" placeholder="Enter date of birth" value={user.dateOfBirth}/>
            </VStack>
            <VStack space={3}>
                <Text fontSize="md" bold>
                Email Address
                </Text>
              <Input variant="outline" placeholder="Enter email address" value={user.email}/>
            </VStack>
            <VStack space={3}>
                <Text fontSize="md" bold>
                Phone Number
                </Text>
              <Input variant="outline" placeholder="Enter phone number" value={user.phoneNumber}/>
            </VStack>
            <VStack space={3}>
                <Text fontSize="md" bold>
                Location
                </Text>
              <Input variant="outline" placeholder="Enter location" value={user.location}/>
            </VStack>

            <HStack>
              <Image
                source={require("../assets/Icons/aboutme.png")}
                alt="Alternate Text"
                size={6}
              />
              <Text fontSize="md" bold px={2}>
                About Me
              </Text>
            </HStack>
            <TextArea placeholder="About Me"></TextArea>
            <HStack>
              <Image
                source={require("../assets/Icons/education.png")}
                alt="Alternate Text"
                size={6}
              />
              <Text fontSize="md" bold px={2}>
                Education
              </Text>
            </HStack>
            <TextArea placeholder="Level of Education"></TextArea>
            {/* Skill */}
            <HStack>
              <Image
                source={require("../assets/Icons/skill.png")}
                alt="Alternate Text"
                size={6}
              />
              <Text fontSize="md" bold px={2}>
                Skill
              </Text>
            </HStack>
            <Box py={3} borderTopColor="#d4d4d4" borderTopWidth={1}>
              <Center>
                <HStack space={3} py={3}>
                  <Badge
                    bg={"#EAEAEA"}
                    rounded={10}
                    variant={"solid"}
                    size="10"
                  >
                    <Text fontSize="md" onPress={() => console.log("Teamwork")}>
                      Teamwork
                    </Text>
                  </Badge>
                  <Badge bg={"#EAEAEA"} rounded={10} variant={"solid"} size="">
                    <Text
                      fontSize="md"
                      onPress={() => console.log("Leadership")}
                    >
                      Leadership
                    </Text>
                  </Badge>
                  <Badge bg={"#EAEAEA"} rounded={10} variant={"solid"} size="">
                    <Text
                      fontSize="md"
                      onPress={() => console.log("Target oriented")}
                    >
                      Target oriented
                    </Text>
                  </Badge>
                </HStack>
                <HStack space={2} py={3}>
                  <Badge bg={"#EAEAEA"} rounded={10} variant={"solid"}>
                    <Text
                      fontSize="md"
                      onPress={() => console.log("Consistent")}
                    >
                      Consistent
                    </Text>
                  </Badge>
                  <Badge bg={"#EAEAEA"} rounded={10} variant={"solid"} size="">
                    <Text fontSize="md" onPress={() => console.log("Visioner")}>
                      Visioner
                    </Text>
                  </Badge>
                  <Badge
                    bg={"#EAEAEA"}
                    rounded={10}
                    variant={"solid"}
                    size="md"
                  >
                    <Text
                      fontSize="md"
                      onPress={() => console.log("Good Communication")}
                    >
                      Good Communication
                    </Text>
                  </Badge>
                </HStack>
                <Text color="lightBlue.700" paddingTop={5}>
                  See More
                </Text>
              </Center>
            </Box>

            <HStack>
              <Image
                source={require("../assets/Icons/resume.png")}
                alt="Alternate Text"
                size={6}
              />
              <Text fontSize="md" bold px={2}>
                Resume
              </Text>
            </HStack>
            <Box borderRadius={3} borderColor="#d4d4d4" borderWidth={1} py={2}>
              <Center py={6}>
                <Image
                  source={require("../assets/Icons/upload.png")}
                  alt="Alternate Text"
                  size={4}
                />
                Upload CV/Resume
              </Center>
            </Box>
          </VStack>
        </Box>

        {/* Button */}
        <HStack p={5} space={5}>
          <Button
            w="30%"
            size="xs"
            variant="subtle"
            colorScheme="success"
            onPress={() => navigation.navigate("JobDetail")}
          >
            Save
          </Button>
          <Button
            w="30%"
            size="xs"
            variant="subtle"
            colorScheme="danger"
            onPress={() => navigation.navigate("CompanyProfile")}
          >
            Cancel
          </Button>
        </HStack>
      </ScrollView>
      <TabsNavigation navigation={navigation} />
    </View>
  );
};

export default UserProfile;
