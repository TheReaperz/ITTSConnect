import { View } from 'react-native';
import { Heading, Container, HStack, Avatar, Center } from 'native-base';
import TabsNavigation from '../components/TabsNavigation';
import JobsCard from '../components/JobsCard';
import { useAuth } from "../context/auth";
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, } from 'firebase/firestore';
import { db } from '../firebase';


import { ScrollView } from 'react-native';

const HomeUserScreen = ({ navigation }) => {
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
                const querySnapshot = await getDocs(collection(db, "jobs"));
                const jobsArray = [];
                querySnapshot.forEach((doc) => {
                    jobsArray.push({ id: doc.id, ...doc.data() });
                });
                setJobs(jobsArray);
            } catch (error) {
                console.error("Error fetching jobs: ", error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <HStack space="2" alignItems="center" pt={3}>
                <Container my={5} mx={3} flex={1}> 
                    <Heading px={30}>Hello</Heading>
                    <Heading px={30}>{user.fullName}</Heading>
                </Container>
                <Container size="16" flex={1}> 
                    <Avatar
                        bg="green.500"
                        size={90}
                        borderRadius={100}
                        source={{uri: userData.profilePicture}}
                    >
                        AJ
                    </Avatar>
                </Container>
            </HStack>
            <ScrollView style={{ flex: 1 }} >
                    {jobs.map(job => (
                        <JobsCard key={job.id} job={job} navigation={navigation}/>
                    ))}
            </ScrollView>
            <TabsNavigation navigation={navigation}/>
        </View>
    );
};

export default HomeUserScreen;