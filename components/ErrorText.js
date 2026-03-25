import { StyleSheet, Text } from "react-native";

const ErrorText = ({ errorMessage }) => {
  return <Text style={styles.error}>{errorMessage}</Text>;
};
const styles = StyleSheet.create({
  error: {
    color: "red",
    paddingBlock: 5,
    textAlign: "center",
  },
});
export default ErrorText;
