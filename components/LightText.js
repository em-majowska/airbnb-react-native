import { StyleSheet, Text } from "react-native";
import colors from "../assets/colors/main.json";

const LightText = ({ text }) => {
  return <Text style={styles.light}>{text}</Text>;
};
const styles = StyleSheet.create({
  light: {
    color: colors.grey,
  },
});
export default LightText;
