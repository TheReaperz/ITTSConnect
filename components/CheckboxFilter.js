import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CheckboxFilter = ({ onSelectionChange, selectedOptions: initialSelectedOptions }) => {
    const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions || []);

    const options = [
        { key: 'Fulltime', text: 'Fulltime' },
        { key: 'Internship', text: 'Internship' },
        { key: 'Assistant', text: 'Assistant' },
        { key: 'Freelance', text: 'Freelance' },
        { key: 'Part-Time', text: 'Part-Time' },
    ];

    const handleOptionSelect = (option) => {
        const currentIndex = selectedOptions.indexOf(option);
        const newSelectedOptions = [...selectedOptions];

        if (currentIndex === -1) {
            newSelectedOptions.push(option);
        } else {
            newSelectedOptions.splice(currentIndex, 1);
        }

        setSelectedOptions(newSelectedOptions);
        onSelectionChange(newSelectedOptions); // Update parent component
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Job Type</Text>
            {options.map((option) => (
                <TouchableOpacity key={option.key} onPress={() => handleOptionSelect(option.key)}>
                    <Text>
                        {selectedOptions.includes(option.key) ? (
                            <Icon name="check-square-o" size={16} color="#000" />
                        ) : (
                            <Icon name="square-o" size={16} color="#000" />
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

export default CheckboxFilter;
