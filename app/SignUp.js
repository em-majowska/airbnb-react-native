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

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
          {
            email: email,
            username: username,
            description: description,
            password: password,
          },
        );

        // Notify user
        alert("Successfully registered!");
      } catch (error) {
        error.message && setErrorMessage(error.message);
        if (error.response) {
          setErrorMessage(error.response.data.error);
        }
      }
    };

    setIsLoading(true);

    // Check if all fields are filled
    if (!email || !password || !confirmPassword || !description || !username) {
      setErrorMessage("Please fill all fields");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords must match");
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
      <Header title="Sign up" />
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
          placeholder="username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={colors.lightgrey}
          multiline
        />
        <TextInput
          style={styles.inputMultiline}
          placeholder="Describe yourself in a few words..."
          value={description}
          onChangeText={setDescription}
          placeholderTextColor={colors.lightgrey}
          textAlignVertical="top"
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={colors.lightgrey}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor={colors.lightgrey}
          secureTextEntry
        />
      </View>

      <View style={styles.section}>
        {errorMessage && <ErrorText errorMessage={errorMessage} />}
        <Button
          title="Sign up"
          onPress={onSubmit}
          isLoading={isLoading}
          disabled={isLoading}
        />
        <Link href="/index" style={styles.link}>
          Already have an account ? Sign in
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
    paddingBlock: 5,
    borderColor: colors.lightpink,
    borderBottomWidth: 2,
    textDecorationStyle: "none",
  },
  inputMultiline: {
    borderWidth: 2,
    height: 100,
    borderColor: colors.lightpink,
    textDecorationStyle: "none",
    paddingBlock: 5,
  },
  section: {
    alignItems: "center",
  },
  link: {
    color: colors.grey,
    textAlign: "center",
  },
});
