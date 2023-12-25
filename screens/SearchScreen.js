import { View, TextInput, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Heading, Container } from 'native-base';
import TabsNavigation from '../components/TabsNavigation';
import JobsCard from '../components/JobsCard';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import FilterScreen from './FilterScreen';
import searchIcon from '../assets/Icons/search-bar-icon.png';
import filterIcon from '../assets/Icons/filter-icon.png';
import filteredIcon from '../assets/Icons/filtered-icon.png';

import { ScrollView } from 'react-native';

const SearchScreen = ({ navigation }) => {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({ jobTypes: [], experience: null });

    const areFiltersApplied = () => {
        return filters.jobTypes.length > 0 || filters.experience !== null;
    };

    const clearFilters = () => {
        setFilters({ jobTypes: [], experience: null });
    };
    
    useEffect(() => {
        const fetchFilteredJobs = async () => {
            try {
                
                // Filter by job type if any job type is selected
                if (filters.jobTypes.length > 0) {
                    jobsQuery = query(
                        collection(db, 'jobs'),
                        where('jobType', '==', filters.jobTypes[0]),
                      );
                }
    
                // Filter by experience if an experience level is selected
                if (filters.experience) {
                    jobsQuery = query(
                        collection(db, 'jobs'),
                        where('experience', '==', filters.experience),
                      );
                }
                
                // If no filters are applied, fetch all jobs
                if (!areFiltersApplied()) {
                    jobsQuery = query(collection(db, 'jobs'));
                }

                const querySnapshot = await getDocs(jobsQuery);
                const jobsArray = [];
                querySnapshot.forEach((doc) => {
                    jobsArray.push({ id: doc.id, ...doc.data() });
                });
                setJobs(jobsArray);

            } catch (error) {
                console.error("Error fetching jobs: ", error);
            }
        };
    
        fetchFilteredJobs();
    }, [filters]);

    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

    const handleFilterModal = () => {
        setIsFilterModalVisible(!isFilterModalVisible);
    };

    return (
        <View style={{ flex: 1 }}>
            <Container paddingTop={60}>
                <Heading px={30}>Let's</Heading>
                <Heading px={30}>Find Your Perfect Jobs</Heading>
            </Container>
                <View style={styles.container}>
                <View style={styles.backgroundStyle}>
                    <View style={styles.iconContainer}>
                        <Image source={searchIcon} style={styles.iconStyle} />
                    </View>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.inputStyle}
                        placeholder="Search"
                    />
                </View>
                <TouchableOpacity style={styles.filterButtonContainer} onPress={handleFilterModal}>
                    <Image 
                        source={areFiltersApplied() ? filteredIcon : filterIcon} 
                        style={styles.filterButtonIcon} 
                    />
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    visible={isFilterModalVisible}
                    onRequestClose={() => setIsFilterModalVisible(false)}>
                    <FilterScreen
                        onClose={() => setIsFilterModalVisible(false)}
                        onApplyFilters={(selectedFilters) => setFilters(selectedFilters)}
                        currentFilters={filters} // Pass current filters to FilterScreen
                    />
                </Modal>


                </View>
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        marginTop: 10,
    },
    backgroundStyle: {
        backgroundColor: '#F0EEEE',
        height: 40,
        width: '85%',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000000',
    },
    inputStyle: {
        flex: 1,
        fontSize: 12,
        borderWidth: 0,
    },
    iconContainer: {
        marginHorizontal: 10,
        width: 40,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyle: {
        width: 17,
        height: 17,
    },
    filterButtonContainer: {
        marginLeft: 10,
        width: 40,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B7BFC7',
    },
    filterButtonIcon: {
        width: 17,
        height: 17,
    },
});
