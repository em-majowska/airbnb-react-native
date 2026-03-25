import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import colors from "../assets/colors/main.json";

const SubmitButton = ({ title, onPress, isLoading, disabled }) => {
  return (
    <Pressable style={styles.button} onPress={onPress} disabled={disabled}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    borderColor: colors.pink,
    borderWidth: 3,
    padding: 14,
    alignItems: "center",
    borderRadius: 30,
    marginBlockEnd: 20,
  },
  buttonText: {
    fontSize: 20,
    color: colors.grey,
  },
});
export default SubmitButton;
