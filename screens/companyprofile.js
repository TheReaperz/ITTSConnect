import React from "react";
import { useEffect, useState } from "react";
import { ScrollView, View, Alert} from "react-native";
import ProfileBox from "../components/profilebox";
import TabsNavigationCompany from "../components/TabsNavigationCompany";
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { db, app } from "../firebase";
import { useAuth } from "../context/auth";
import {
  Button,
  VStack,
  Box,
  HStack,
  Input,
  Text,
  Toast,
} from "native-base";

const CompanyProfile = ({ navigation }) => {

  const { user, signOut } = useAuth()
  
  const handleLogout = async () => {
    await signOut()
  };

  const [userData, setUserData] = useState({user});
  const [documentId, setDocumentId] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let userQuery = query(collection(db, 'users'), where('id', '==', user.id));
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0]; 
          const fetchedUserData = docSnapshot.data();
          const documentId = docSnapshot.id; 
    
          setUserData(fetchedUserData);
          setDocumentId(documentId); 
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
  }, [user]);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled && result.assets) {
      const uri = result.assets[0].uri;
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
      // Update the user profile image
      const userRef = doc(db, 'users', documentId);
      await updateDoc(userRef, {
        profilePicture: url
      });
      setUserData({ ...userData, profilePicture: url });
  
      // Update the companyImage field in all job documents
      const jobsQuery = query(
        collection(db, "jobs"),
        where("companyEmail", "==", userData.email)
      );
      const querySnapshot = await getDocs(jobsQuery);
      querySnapshot.forEach(async (docSnapshot) => {
        const jobRef = doc(db, 'jobs', docSnapshot.id);
        await updateDoc(jobRef, {
          companyImage: url
        });
      });
  
      alert("Profile image updated successfully");
    } catch (error) {
      console.error("Error updating profile image: ", error);
    }
  };  
  

  const updateUserProfile = async () => {
    if (!areFieldsValid()) return;

    try {
      const userRef = doc(db, 'users', documentId);
      await updateDoc(userRef, {
        location: userData.location,
        aboutCompany: userData.aboutCompany,
        companyPhoneNumber: userData.companyPhoneNumber,
        companyType: userData.companyType,
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
    if (!userData.companyPhoneNumber || !userData.email || !userData.location) {
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


  const uploadImageToFirebase = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const storage = getStorage(app); // Use the initialized Firebase app
    const storageRef = ref(storage, `assets/companyProfile/${filename}`);
  
    try {
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      updateUserProfileImage(downloadURL);
    } catch (error) {
      console.error("Error uploading image to Firebase: ", error);
    }
  };

  const handleLocationChange = (text) => {
    setUserData({ ...userData, location: text });
  };

  const handleTypeChange = (text) => {
    setUserData({ ...userData, companyType: text });
  };

  const handleAboutCompanyChange = (text) => {
    setUserData({ ...userData, aboutCompany: text });
  };

  const handleCompanyPhoneNumberChange = (text) => {
    setUserData({ ...userData, companyPhoneNumber: text });
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
          <VStack space={2} px={3}>
            <VStack space={3}>
                <Text fontSize="md" bold>
                  Full Name
                </Text>
              <Input variant="outline" placeholder="Enter a full name" value={userData.fullName} editable={false}/>
            </VStack>
            <VStack space={3}>
                <Text fontSize="md" bold>
                  Location
                </Text>
              <Input variant="outline" placeholder="Enter a full name" value={userData.location} onChangeText={handleLocationChange}/>
            </VStack>
            <VStack space={3}>
                <Text fontSize="md" bold>
                  Email Address
                </Text>
              <Input variant="outline" placeholder="Enter a full name" value={userData.email} editable={false}/>
            </VStack>
            <VStack space={3}>
                <Text fontSize="md" bold>
                  Phone Number
                </Text>
              <Input variant="outline" placeholder="Enter Phone Number" value={userData.companyPhoneNumber} onChangeText={handleCompanyPhoneNumberChange}/>
            </VStack>
            <VStack space={3}>
                <Text fontSize="md" bold>
                  Type
                </Text>
              <Input variant="outline" placeholder="Type of Company" value={userData.companyType} onChangeText={handleTypeChange}/>
            </VStack>
            <VStack space={3}>
                <Text fontSize="md" bold>
                  About Company
                </Text>
              <Input variant="outline" placeholder="About Company" value={userData.aboutCompany} onChangeText={handleAboutCompanyChange}/>
            </VStack>
          </VStack>
        </Box>

        <HStack p={5} space={5}>
          <Button
            w="30%"
            size="xs"
            variant="subtle"
            colorScheme="success"
            onPress={confirmUpdate}
          >
            Save
          </Button>
          <Button
            w="30%"
            size="xs"
            variant="subtle"
            colorScheme="danger"
            onPress={() => console.log("Cancel")}
          >
            Cancel
          </Button>
        </HStack>
      </ScrollView>
      <TabsNavigationCompany navigation={navigation} />
    </View>
  );
};

export default CompanyProfile;
