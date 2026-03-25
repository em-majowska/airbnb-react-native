import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../assets/colors/main.json";

const RedirectButton = ({ text, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.link}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  link: {
    color: colors.grey,
    textAlign: "center",
  },
});
export default RedirectButton;
