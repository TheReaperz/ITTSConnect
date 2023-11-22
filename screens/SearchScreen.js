import { View } from 'react-native';
import { Heading, Container } from 'native-base';
import TabsNavigation from '../components/TabsNavigation';
import JobsCard from '../components/JobsCard';
import SearchBar from '../components/SearchBar';

import { ScrollView } from 'react-native';

const SearchScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <Container paddingTop={60}>
                <Heading px={30}>Let's</Heading>
                <Heading px={30}>Find Your Perfect Jobs</Heading>
            </Container>
            <SearchBar navigation={navigation} />
            <ScrollView style={{ flex: 1 }} >
                <JobsCard />
                <JobsCard />
                <JobsCard />
                <JobsCard />
                <JobsCard />
                <JobsCard />
                <JobsCard />
            </ScrollView>
            <TabsNavigation />
        </View>
    );
};

export default SearchScreen;