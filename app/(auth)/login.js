import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import colors from "../../assets/colors/main.json";

import SubmitButton from "../../components/SubmitButton";
import Logo from "../../components/Logo";
import Title from "../../components/Title";
import Input from "../../components/Input";
import ErrorText from "../../components/ErrorText";
import RedirectButton from "../../components/RedirectButton";
import { AuthContext } from "../../context/AuthContext";

const router = useRouter();

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pwdHidden, setPwdHidden] = useState(true);

  const { login } = useContext(AuthContext);

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

        login(response.data.token, response.data.id);
        router.navigate("home/rooms");
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
      keyboardVerticalOffset={100}
      style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Logo />
          <Title title="Sign in" />
        </View>
        <View style={styles.form}>
          <Input
            type="input"
            placeholder="email"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={pwdHidden}
            setHidden={setPwdHidden}
          />
        </View>
        <View style={styles.section}>
          {errorMessage && <ErrorText errorMessage={errorMessage} />}
          <SubmitButton
            title="Sign in"
            onPress={onSubmit}
            isLoading={isLoading}
            disabled={isLoading}
          />
          <RedirectButton
            text="No account ? Register"
            onPress={() => {
              router.navigate("/signup");
            }}
          />
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBlockStart: Constants.statusBarHeight,
    paddingBlockEnd: 50,
    flex: 1,
  },
  content: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingInline: 40,
    gap: 20,
  },
  header: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.grey,
  },
  form: {
    width: "100%",
    gap: 20,
  },
  section: {
    alignItems: "center",
  },
});
