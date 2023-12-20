import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Image } from 'react-native';

const TabsNavigationCompany= ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("AddJobScreen")}>
                <Image source={require('../assets/Icons/add.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("HomeCompanyScreen")}>
                <Image source={require('../assets/Icons/home.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("CompanyProfile")} >
                <Image source={require('../assets/Icons/profile.png')} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        height: 60,
    },
    tab: {
        alignItems: 'center',
        
    },
});

export default TabsNavigationCompany;