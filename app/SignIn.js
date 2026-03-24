import { Link, useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import Header from "./components/Header";

import colors from "../assets/colors/main.json";
import Button from "./components/Button";
import ErrorText from "./components/ErrorText";
import axios from "axios";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

const router = useRouter();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pwdHidden, setPwdHidden] = useState(true);

  const onSubmit = () => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          {
            email: email,
            password: password,
          },
        );

        // Notify user
        alert("Successfully logged in!");
      } catch (error) {
        error.message && setErrorMessage(error.message);
        if (error.response) {
          setErrorMessage(error.response.data.error);
        }
      }
    };

    setIsLoading(true);

    // Check if all fields are filled
    if (!email || !password) {
      setErrorMessage("Please fill all fields");
      setIsLoading(false);
      return;
    }

    fetchData();
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <Header title="Sign in" />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={colors.lightgrey}
        />

        <View style={styles.input}>
          <TextInput
            style={styles.inputPassword}
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={colors.lightgrey}
            secureTextEntry={pwdHidden}
          />
          <Pressable
            onPress={() => {
              setPwdHidden(!pwdHidden);
            }}>
            <FontAwesome name="eye" size={24} color={colors.grey} />
          </Pressable>
        </View>
      </View>

      <View>
        {errorMessage && <ErrorText errorMessage={errorMessage} />}
        <Button
          title="Sign in"
          onPress={onSubmit}
          isLoading={isLoading}
          disabled={isLoading}
        />

        <Link href="/SignUp" style={styles.link}>
          No account ? Register
        </Link>
      </View>
      <StatusBar style="dark" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingInline: 40,
    paddingBlock: 40,
    gap: 20,
    marginBlockStart: Constants.statusBarHeight,
  },
  text: {
    color: colors.grey,
  },
  form: {
    width: "100%",
    gap: 20,
  },

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

  link: {
    color: colors.grey,
    textAlign: "center",
  },
});
