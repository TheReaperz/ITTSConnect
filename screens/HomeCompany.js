import { View,TouchableOpacity } from 'react-native';
import { Heading, Container, HStack, Avatar, Text, Image } from 'native-base';
import JobsCardCompany from '../components/JobsCardCompany';
import TabsNavigationCompany from '../components/TabsNavigationCompany';
import { useAuth } from '../context/auth';

import { ScrollView } from 'react-native';

const HomeCompanyScreen = ({ navigation }) => {
    const { user } = useAuth();

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
                <Text mx='10' textAlign='center' bold fontSize="md">Recent Application</Text>
            </Container>
            <ScrollView style={{ flex: 1 }} >
                <JobsCardCompany />
                <JobsCardCompany />
                <JobsCardCompany />
                <JobsCardCompany />
                <JobsCardCompany />
                <JobsCardCompany />
                <JobsCardCompany />
            </ScrollView>
            <TabsNavigationCompany navigation={navigation}/>
        </View>
    );
};

export default HomeCompanyScreen;