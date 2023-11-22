import React from "react";
import { Box, Center, Avatar, Text, HStack } from "native-base";

const JobDetailHeader = ({ title, company, location, date, avatarSource }) => {
  return (
    <Box shadow={5} height="130" backgroundColor="error.500">
      <Center>
        <Avatar size="xl" mt="-50" borderColor={"blueGray.900"} source={avatarSource} />
      </Center>

      <Center>
        <Box>
          <Text fontSize="md" fontWeight="bold" color="white" textAlign="center" py={2}>
            {title}
          </Text>
          <HStack space={3}>
            <Text fontSize="md" color="white">
              {company}
            </Text>
            <Text fontSize="md" color="white">
              • {location}
            </Text>
            <Text fontSize="md" color="white">
              • {date}
            </Text>
          </HStack>
        </Box>
      </Center>
    </Box>
  );
};

export default JobDetailHeader;