import React, { useContext, useState, useEffect } from "react";
import { ScrollView, View, Alert } from "react-native";
import ProfileBox from "../components/profilebox";
import { Input, Toast } from "native-base";
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { db, app } from '../firebase';
import {
  Text,
  Button,
  VStack,
  Box,
  HStack,
  TextArea,
  Center,
  Image,
} from "native-base";
import TabsNavigation from "../components/TabsNavigation";
import { useAuth } from "../context/auth";

const UserProfile = ({ navigation }) => {
  const { user, signOut } = useAuth();
  const handleLogout = async () => {
    await signOut();
  };
  const [userData, setUserData] = useState({user});
  const [documentId, setDocumentId] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let userQuery = query(collection(db, 'users'), where('id', '==', user.id));
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0]; // Correctly declared inside the try block
          const fetchedUserData = docSnapshot.data();
          const documentId = docSnapshot.id; // Fetching the document ID
    
          setUserData(fetchedUserData);
          setDocumentId(documentId); // Assuming you have a state to store this ID
          setSkills(fetchedUserData.skill || []);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      }
    };    
  
    if (user && user.id) {
      fetchUserProfile();
    }
  }, [user]); // Dependency array includes 'user' to re-run the effect when 'user' changes
  

  const [skills, setSkills] = useState([]);
  const handleSkillChange = (text, index) => {
    const newSkills = [...skills];
    newSkills[index] = text;
    setSkills(newSkills);
  };
  const addSkillInput = () => {
    setSkills([...skills, ""]); // Adds a new empty string to the skills array
  };
  
  const deleteSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const handleLocationChange = (text) => {
    setUserData({ ...userData, location: text });
  };

  const handlePhoneNumberChange = (text) => {
    setUserData({ ...userData, phoneNumber: text });
  };

  const handleAboutMeChange = (text) => {
    setUserData(prevState => ({ ...prevState, aboutMe: text }));
  };  
  
  const handleEducationChange = (text) => {
    setUserData({ ...userData, education: text });
  };
  
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled && result.assets) {
      const uri = result.assets[0].uri; // Access the image URI from the assets array
      uploadImageToFirebase(uri);
    }
  };
  
  
  const getPermissionAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need Gallery Access for uploading images!');
    }
  };
  
  useEffect(() => {
    getPermissionAsync();
  }, []);
  

  const updateUserProfileImage = async (url) => {
    try {
      const userRef = doc(db, 'users', documentId); // Assuming documentId is correct
      await updateDoc(userRef, {
        profilePicture: url
      });
      alert("Profile image updated successfully");
      // Update userData state if needed
    } catch (error) {
      console.error("Error updating profile image: ", error);
    }
  };
  
  
  
  const uploadImageToFirebase = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const storage = getStorage(app); // Use the initialized Firebase app
    const storageRef = ref(storage, `assets/userProfile/${filename}`);
  
    try {
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      updateUserProfileImage(downloadURL);
    } catch (error) {
      console.error("Error uploading image to Firebase: ", error);
    }
  };

  

  const updateUserProfile = async () => {
    if (!areFieldsValid()) return;

    try {
      const userRef = doc(db, 'users', documentId); // Make sure user.id is the correct identifier
      await updateDoc(userRef, {
        skill: skills.filter(r => r && typeof r === 'string'),
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        location: userData.location,
        aboutMe: userData.aboutMe,
        education: userData.education,
      });
      Toast.show({
        title: "Profile updated successfully",
        status: "success",
        duration: 2000
      });
    } catch (error) {
      console.error("Error updating profile: ", error);
      Toast.show({
        title: "Error updating profile",
        status: "error",
        duration: 2000
      });
    }
  };

  const areFieldsValid = () => {
    if (!userData.fullName || !userData.dateOfBirth || !userData.email || !userData.phoneNumber || !userData.location) {
      // You can use an alert or any other method to show the error
      alert('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const confirmUpdate = () => {
    Alert.alert(
      "Confirm Update",
      "Are you sure you want to update your profile?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => updateUserProfile() }
      ]
    );
  };

  
  return (
    <View style={{ flex: 1 }} backgroundColor="white">
      <ScrollView>
      <ProfileBox
        title={user.fullName}
        subtitle={user.location}
        avatarSource={{uri: userData.profilePicture}}
        onPressChangeImage={selectImage}
        onPressLogout={handleLogout}
      />

        <Box paddingTop="4">
          <VStack space="2" px={6}>
            <VStack space={3}>
                <Text fontSize="md" bold>
                  Full Name
                </Text>
              <Input variant="outline" placeholder="Enter a full name" value={userData.fullName} editable={false}/>
            </VStack>
            <VStack space={3}>
                <Text fontSize="md" bold>
                Date of Birth
                </Text>
              <Input variant="outline" placeholder="Enter date of birth" value={userData.dateOfBirth}/>
            </VStack>
            <VStack space={3}>
                <Text fontSize="md" bold>
                Email Address
                </Text>
              <Input variant="outline" placeholder="Enter email address" value={userData.email}/>
            </VStack>
            <VStack space={3}>
                <Text fontSize="md" bold>
                Phone Number
                </Text>
              <Input variant="outline" placeholder="Enter phone number" value={userData.phoneNumber} onChangeText={handlePhoneNumberChange}/>
            </VStack>
            <VStack space={3}>
                <Text fontSize="md" bold>
                Location
                </Text>
              <Input variant="outline" placeholder="Enter location" value={userData.location} onChangeText={handleLocationChange}/>
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
            <TextArea
                placeholder="About Me"
                value={userData.aboutMe || ''}
                onChangeText={handleAboutMeChange}
              />

            {/* Skill */}
            <HStack>
              <Image
                source={require("../assets/Icons/skill.png")}
                alt="Alternate Text"
                size={6}
              />
              <Text fontSize="md" bold px={2}>
                Skills
              </Text>
            </HStack>
            <Box py={3} borderTopColor="#d4d4d4" borderTopWidth={1}>
              <Center>
              {skills.map((skill, index) => (
                  <HStack key={index} width="100%" space={2} alignItems="center">
                    <Input
                      flex={1}
                      mx={3}
                      placeholder={`Skill ${index + 1}`}
                      value={skill}
                      onChangeText={text => handleSkillChange(text, index)}
                    />
                    <Button
                      colorScheme="danger"
                      onPress={() => deleteSkill(index)}
                    >
                      Delete
                    </Button>
                  </HStack>
                ))}

                {skills.length < 5 && (
                  <Button marginTop={3} marginLeft={3} center maxWidth="320" colorScheme="danger" onPress={addSkillInput}>
                    <Text color="white">Add Another Skill</Text>
                  </Button>
                )}
              </Center>
            </Box>
            
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
            <Box py={3} borderTopColor="#d4d4d4" borderTopWidth={1}>
            <TextArea
                placeholder="Level of Education"
                value={userData.education || ''}
                onChangeText={handleEducationChange}
              />
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
          onPress={confirmUpdate} // Call the update function here
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
