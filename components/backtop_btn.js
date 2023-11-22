import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { Container } from "native-base";

const TopBackButton = ({ navigation }) => {
  return (
    <Container paddingTop={45} py={10}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require("../assets/Icons/back.png")}
          style={{ width: 19, height: 15, marginLeft: 20 }}
        />
      </TouchableOpacity>
    </Container>
  );
};

export default TopBackButton;