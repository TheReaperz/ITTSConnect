import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import searchIcon from '../assets/Icons/search-bar-icon.png';
import filterIcon from '../assets/Icons/filter-icon.png';

const SearchBar = ({ term, onTermChange, onTermSubmit, navigation }) => {
    return (
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
                    value={term}
                    onChangeText={onTermChange}
                    onEndEditing={onTermSubmit}
                />
            </View>
            <TouchableOpacity style={styles.filterButtonContainer} 
                onPress={() => navigation.navigate('Filter')} >
                <Image source={filterIcon} style={styles.filterButtonIcon} />
            </TouchableOpacity>
        </View>
    );
};

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

export default SearchBar;
