import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Container, Heading, Button, Text } from 'native-base';
import CheckboxFilter from '../components/CheckboxFilter';
import RadioButtonFilter from '../components/RadioButtonFilter';

const FilterScreen = ({ onClose, onApplyFilters, currentFilters }) => {

    const [selectedJobTypes, setSelectedJobTypes] = useState(currentFilters.jobTypes || []);
    const [selectedExperience, setSelectedExperience] = useState(currentFilters.experience || null);

    const handleJobTypeChange = (newSelectedJobTypes) => {
        setSelectedJobTypes(newSelectedJobTypes);
    };

    const handleExperienceChange = (newExperience) => {
        setSelectedExperience(newExperience);
    };

    const clearFilters = () => {
        setSelectedJobTypes([]);
        setSelectedExperience(null);

        // Pass empty filter object back to SearchScreen
        onApplyFilters({ jobTypes: [], experience: null });

        // Close the modal
        onClose();
    };

    const handleSubmit = () => {
        // Construct filter object
        const filters = {
            jobTypes: selectedJobTypes,
            experience: selectedExperience
        };

        // Pass filter object back to SearchScreen
        onApplyFilters(filters);

        // Close the modal
        onClose();
    };

    return (
        <View style={{ flex: 1 }}>
            <Container paddingTop={45}>
                <TouchableOpacity onPress={onClose} >
                    <Image
                        source={require('../assets/Icons/back.png')}
                        style={{ width: 19, height: 15, marginLeft: 20 }}
                    />
                </TouchableOpacity>
            </Container>
            <Container paddingTop={25}>
                <Heading px={30}>Job Filter</Heading>
            </Container>
            <ScrollView style={{ flex: 1 }}>
                <CheckboxFilter 
                    onSelectionChange={setSelectedJobTypes} 
                    selectedOptions={currentFilters.jobTypes}
                />
                <RadioButtonFilter 
                    onSelectionChange={setSelectedExperience} 
                    selectedOption={currentFilters.experience}
                />
            </ScrollView>
            <Button
              mx={8}
              rounded={15}
              variant={"subtle"}
              colorScheme="gray"
              size="md"
              onPress={clearFilters}
            >
              <Text bold color={"black"}>Clear Filter</Text>
            </Button>
            <Button
              mt={4}
              mb={4}
              mx={8}
              rounded={15}
              colorScheme="danger"
              size="md"
              onPress={handleSubmit}
            >
              <Text bold color={"white"}>APPLY FILTER</Text>
            </Button>
        </View>
    );
};

export default FilterScreen;
