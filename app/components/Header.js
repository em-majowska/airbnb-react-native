import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../../assets/images/logo.png";
import colors from "../../assets/colors/main.json";

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    marginBlockEnd: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.grey,
    textAlign: "center",
  },
});

export default Header;
