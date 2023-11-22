import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RadioButtonFilter = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option === selectedOption ? null : option);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Experience</Text>
            <TouchableOpacity onPress={() => handleOptionSelect('option1')}>
                <Text>
                    {selectedOption === 'option1' ? (
                        <Icon name="dot-circle-o" size={16} color="#000" />
                    ) : (
                        <Icon name="circle-thin" size={16} color="#000" />
                    )}{' '}
                    Apprenticeship
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionSelect('option2')}>
                <Text>
                    {selectedOption === 'option2' ? (
                        <Icon name="dot-circle-o" size={16} color="#000" />
                    ) : (
                        <Icon name="circle-thin" size={16} color="#000" />
                    )} Part-time
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionSelect('option3')}>
                <Text>
                    {selectedOption === 'option3' ? (
                        <Icon name="dot-circle-o" size={16} color="#000" />
                    ) : (
                        <Icon name="circle-thin" size={16} color="#000" />
                    )} Full time
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionSelect('option4')}>
                <Text>
                    {selectedOption === 'option4' ? (
                        <Icon name="dot-circle-o" size={16} color="#000" />
                    ) : (
                        <Icon name="circle-thin" size={16} color="#000" />
                    )} Contract
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionSelect('option5')}>
                <Text>
                    {selectedOption === 'option5' ? (
                        <Icon name="dot-circle-o" size={16} color="#000" />
                    ) : (
                        <Icon name="circle-thin" size={16} color="#000" />
                    )} Project-based
                </Text>
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

export default RadioButtonFilter;
