import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RadioButtonFilter = ({ onSelectionChange, selectedOption: initialSelectedOption }) => {
    const [selectedOption, setSelectedOption] = useState(initialSelectedOption || null);

    const options = [
        { key: 'Fresh Graduate', text: 'Fresh Graduate' },
        { key: '1 Year', text: '1 Year' },
        { key: '3 Years', text: '3 Years' },
        { key: '5 Years', text: '5 Years' },
    ];

    const handleOptionSelect = (option) => {
        const newSelection = option === selectedOption ? null : option;
        setSelectedOption(newSelection);
        onSelectionChange(newSelection); // Call the callback with the new selection
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Experience</Text>
            {options.map((option) => (
                <TouchableOpacity key={option.key} onPress={() => handleOptionSelect(option.key)}>
                    <Text>
                        {selectedOption === option.key ? (
                            <Icon name="dot-circle-o" size={16} color="#000" />
                        ) : (
                            <Icon name="circle-thin" size={16} color="#000" />
                        )}
                        {' ' + option.text}
                    </Text>
                </TouchableOpacity>
            ))}
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
