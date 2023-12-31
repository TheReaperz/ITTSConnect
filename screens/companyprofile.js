import React from "react";
import { useEffect, useState } from "react";
import { ScrollView, View, } from "react-native";
import ProfileBox from "../components/profilebox";
import FormInput from "../components/company_profileforminput";
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
      const userRef = doc(db, 'users', documentId);
      await updateDoc(userRef, {
        profilePicture: url
      });
      // Update local state
      setUserData({ ...userData, profilePicture: url });
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
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        location: userData.location,
        companyType: userData.companyType,
        aboutMe: userData.aboutMe,
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
          <VStack space={3}>
            <FormInput label="Company Name" placeholder="Company Name" />
            <FormInput label="Location" placeholder="Location" />
            <FormInput label="Email Address" placeholder="Email Address" />
            <FormInput label="Phone Number" placeholder="Phone Number" />
            <FormInput label="Type" placeholder="Company Type" />
            <FormInput label="About Company" placeholder="About Company" />
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
