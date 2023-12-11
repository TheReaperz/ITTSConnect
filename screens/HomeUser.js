import { View } from 'react-native';
import { Heading, Container, HStack, Avatar, Center } from 'native-base';
import TabsNavigation from '../components/TabsNavigation';
import JobsCard from '../components/JobsCard';
import { useAuth } from "../context/auth";

import { ScrollView } from 'react-native';

const HomeUserScreen = ({ navigation }) => {
    const { user } = useAuth();
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
                        source={{
                            uri: user.profilePicture
                        }}
                    >
                        AJ
                    </Avatar>
                </Container>
            </HStack>
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