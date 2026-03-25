import { Image, StyleSheet, View } from "react-native";

const Logo = () => {
  return (
    <View>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
    marginBlockEnd: 20,
  },
});

export default Logo;
