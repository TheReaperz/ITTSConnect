import React from "react";
import { Box, Avatar, Text, HStack, Button } from "native-base";

const ProfileBox = ({ title, subtitle, location, avatarSource, onPressChangeImage, onPressLogout }) => {
  return (
    <Box shadow={5} px={5} py={7} borderBottomRadius={20} alignItems="left" backgroundColor="error.500">
      <Avatar size="lg" source={avatarSource} />

      <Box py={3}>
        <Text fontSize="xl" fontWeight="bold" color="white">
          {title}
        </Text>
        <Text fontSize="md" color="white">
          {subtitle}
        </Text>
      </Box>

      <HStack space={220}>
        <Button
          variant="solid"
          size="xs"
          borderRadius={6}
          colorScheme={"light"}
          bgColor={"#fca5a5"}
          onPress={onPressChangeImage}
        >
          Change Image
        </Button>
        <HStack>
          <Button
            variant="solid"
            size="xs"
            borderRadius={6}
            mx={-3}
            colorScheme={"light"}
            bgColor={"#fca5a5"}
            onPress={onPressLogout}
          >
            Logout
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default ProfileBox;