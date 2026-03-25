import { Image, StyleSheet, View } from "react-native";

const Logo = ({ type }) => {
  return (
    <View>
      <Image
        source={require("../assets/images/logo.png")}
        style={type === "sm" ? styles.small : styles.big}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  big: {
    height: 100,
    width: 100,
    marginBlockEnd: 20,
  },
  small: {
    height: 40,
    width: 40,
  },
});

export default Logo;
