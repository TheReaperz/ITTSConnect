import { View } from 'react-native';
import { Heading, Container } from 'native-base';
import TabsNavigation from '../components/TabsNavigation';
import JobsCard from '../components/JobsCard';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

import { ScrollView } from 'react-native';

const SearchScreen = ({ navigation }) => {

    const [jobs, setJobs] = useState([]);
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
            <Container paddingTop={60}>
                <Heading px={30}>Let's</Heading>
                <Heading px={30}>Find Your Perfect Jobs</Heading>
            </Container>
            <SearchBar navigation={navigation} />
            <ScrollView style={{ flex: 1 }} >
                    {jobs.map(job => (
                        <JobsCard key={job.id} job={job} navigation={navigation} />
                    ))}
            </ScrollView>
            <TabsNavigation navigation={navigation} />
        </View>
    );
};

export default SearchScreen;