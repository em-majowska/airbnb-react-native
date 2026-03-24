import { Link, useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import Header from "./components/Header";

import colors from "../assets/colors/main.json";
import Button from "./components/Button";
import ErrorText from "./components/ErrorText";
import axios from "axios";

const router = useRouter();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={colors.lightgrey}
          secureTextEntry
        />
      </View>

      <View>
        {errorMessage && <ErrorText errorMessage={errorMessage} />}
        <Button
          title="Sign in"
          onPress={onSubmit}
          isLoading={isLoading}
          disabled={isLoading}
        />

        <Link href="/signup" style={styles.link}>
          No account ? Register
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingInline: 40,
    paddingBlock: 20,
    gap: 20,
  },
  text: {
    color: colors.grey,
  },
  form: {
    width: "100%",
    gap: 20,
  },
  input: {
    width: "100%",
    paddingBlock: 5,
    borderBottomColor: colors.lightpink,
    borderBottomWidth: 2,
    textDecorationStyle: "none",
  },

  link: {
    color: colors.grey,
    textAlign: "center",
  },
});
