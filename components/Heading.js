import { StyleSheet, Text } from "react-native";

const Heading = ({ text }) => {
  return (
    <Text style={styles.heading} numberOfLines={1}>
      {text}
    </Text>
  );
};
const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    color: "black",
  },
});
export default Heading;
