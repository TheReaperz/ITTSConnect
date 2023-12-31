import { View, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Heading, Container, HStack, Avatar, Text, Image } from 'native-base';
import TabsNavigationCompany from '../components/TabsNavigationCompany';
import { collection, getDocs, query, where, } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/auth';
import { ScrollView } from 'react-native';
import JobsCardCompany from '../components/JobsCardCompany';
import { doc, deleteDoc } from 'firebase/firestore';

const HomeCompanyScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [userData, setUserData] = useState({user});

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            let userQuery = query(collection(db, 'users'), where('id', '==', user.id));
            const querySnapshot = await getDocs(userQuery);
            if (!querySnapshot.empty) {
              const docSnapshot = querySnapshot.docs[0]; // Correctly declared inside the try block
              const fetchedUserData = docSnapshot.data();
        
              setUserData(fetchedUserData);
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

      useEffect(() => {
        const fetchJobs = async () => {
          try {
            // Ensure userData is available and has an email
            if (userData && userData.email) {
              const jobsQuery = query(
                collection(db, "jobs"),
                where("companyEmail", "==", userData.email)
              );
      
              const querySnapshot = await getDocs(jobsQuery);
              const jobsArray = [];
              querySnapshot.forEach((doc) => {
                jobsArray.push({ id: doc.id, ...doc.data() });
              });
      
              setJobs(jobsArray);
            }
          } catch (error) {
            console.error("Error fetching jobs: ", error);
          }
        };
      
        if (userData && userData.email) {
          fetchJobs();
        }
      }, [userData]); // Dependency array includes 'userData' to re-run the effect when 'userData' changes
      
      const handleLongPress = (job) => {
        Alert.alert(
          "Delete Job",
          "Are you sure you want to delete this job?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", onPress: () => deleteJob(job.id) },
          ],
          { cancelable: true }
        );
      };

      const deleteJob = async (jobId) => {
        try {
          const jobRef = doc(db, 'jobs', jobId);
          await deleteDoc(jobRef);
          // Update local state or re-fetch jobs to reflect the deletion
          setJobs(jobs.filter(job => job.id !== jobId));
          Alert.alert("Success", "Job deleted successfully");
        } catch (error) {
          console.error("Error deleting job: ", error);
            Alert.alert("Error", "Error deleting job");
        }
      };     

    return (
        <View style={{ flex: 1 }}>
            <HStack  space="5" alignItems="center">
                <Container  my={5} mx={3}>
                <Heading px={30} >Hello</Heading>
                <Heading px={30}>{user.fullName}</Heading>
                </Container>
                <Container size="20">
                <Avatar bg="green.500" size={70} borderRadius={100} source={{uri: user.companyImage}}>
                </Avatar>
                </Container>
            </HStack>
            <Container>
                <Text mx='10' textAlign='center' bold fontSize="md">Your Active Jobs Listing</Text>
            </Container>
            <ScrollView style={{ flex: 1 }} >
                    {jobs.map(job => (
                        <JobsCardCompany key={job.id} job={job} navigation={navigation} onLongPress={handleLongPress}/>
                    ))}
            </ScrollView>
            <TabsNavigationCompany navigation={navigation}/>
        </View>
    );
};

export default HomeCompanyScreen;