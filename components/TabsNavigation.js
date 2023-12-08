import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Image } from 'react-native';

const TabsNavigation = ({ navigation }) => {
    return (
        <View style={styles.container} >
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('SearchScreen')} >
                <Image source={require('../assets/Icons/search.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('HomeUserScreen')}>
                <Image source={require('../assets/Icons/home.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('UserProfile')}>
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

export default TabsNavigation;
