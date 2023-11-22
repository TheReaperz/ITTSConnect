import { View } from 'react-native';
import { Heading, Container, HStack, Avatar, Text } from 'native-base';
import TabsNavigation from '../components/TabsNavigation';
import JobsCard from '../components/JobsCard';

import { ScrollView } from 'react-native';

const HomeUserScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <HStack  space="5" alignItems="center">
                <Container  my={5} mx={3}>
                <Heading px={30}>Hello</Heading>
                <Heading px={30}>Everald Arther</Heading>
                </Container>
                <Container size="16">
                <Avatar bg="green.500" size={70} borderRadius={100} source={{
                    uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}}>
                        AJ
                </Avatar>
                </Container>
            </HStack>
            <Container>
                <Text mx='10' textAlign='center' bold fontSize="md">Recent Job List</Text>
            </Container>
            <ScrollView style={{ flex: 1 }} >
                <JobsCard />
                <JobsCard />
                <JobsCard />
                <JobsCard />
                <JobsCard />
                <JobsCard />
                <JobsCard />
            </ScrollView>
            <TabsNavigation navigation={navigation}/>
        </View>
    );
};

export default HomeUserScreen;