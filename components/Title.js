import { StyleSheet, Text } from "react-native";
import colors from "../assets/colors/main.json";

const Title = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.grey,
    textAlign: "center",
  },
});

export default Title;
