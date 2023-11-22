import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CheckboxFilter = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionSelect = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Job Type</Text>
            <TouchableOpacity onPress={() => handleOptionSelect('option1')}>
                <Text>{selectedOptions.includes('option1') ? <Icon name="check-square-o" size={16} color="#000" /> : <Icon name="square-o" size={16} color="#000" />} Apprenticeship</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionSelect('option2')}>
                <Text>{selectedOptions.includes('option2') ? <Icon name="check-square-o" size={16} color="#000" /> : <Icon name="square-o" size={16} color="#000" />} Part-time</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionSelect('option3')}>
                <Text>{selectedOptions.includes('option3') ? <Icon name="check-square-o" size={16} color="#000" /> : <Icon name="square-o" size={16} color="#000" />} Full time</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionSelect('option4')}>
                <Text>{selectedOptions.includes('option4') ? <Icon name="check-square-o" size={16} color="#000" /> : <Icon name="square-o" size={16} color="#000" />} Contarct</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionSelect('option5')}>
                <Text>{selectedOptions.includes('option5') ? <Icon name="check-square-o" size={16} color="#000" /> : <Icon name="square-o" size={16} color="#000" />} Project-based</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 15,
    },
    header: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default CheckboxFilter;
