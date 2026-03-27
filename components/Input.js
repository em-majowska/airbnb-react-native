import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import colors from "../assets/colors/main.json";

const Input = ({
  type,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  setHidden,
  multiline,
}) => {
  return type === "password" ? (
    <View style={styles.input}>
      <TextInput
        style={styles.inputPassword}
        placeholder="password"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.grey}
        secureTextEntry={secureTextEntry}
      />
      <Pressable onPress={() => setHidden(!secureTextEntry)}>
        <FontAwesome name="eye" size={24} color={colors.grey} />
      </Pressable>
    </View>
  ) : (
    <TextInput
      style={styles[type]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={colors.lightgrey}
      multiline={multiline}
      textAlignVertical={multiline && "top"}
    />
  );
};

const styles = StyleSheet.create({
  inputPassword: {
    width: "100%",
    flex: 1,
  },
  input: {
    paddingBlock: 5,
    borderBottomColor: colors.lightpink,
    borderBottomWidth: 2,
    textDecorationStyle: "none",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  inputMultiline: {
    borderWidth: 2,
    height: 100,
    borderColor: colors.lightpink,
    textDecorationStyle: "none",
    padding: 5,
  },
});

export default Input;
