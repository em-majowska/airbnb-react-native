import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import colors from "../../assets/colors/main.json";
import { AuthContext } from "../../context/AuthContext";
import SubmitButton from "../../components/SubmitButton";
import Logo from "../../components/Logo";
import Title from "../../components/Title";
import Input from "../../components/Input";
import ErrorText from "../../components/ErrorText";
import RedirectButton from "../../components/RedirectButton";

const router = useRouter();

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pwdHidden, setPwdHidden] = useState(true);
  const [confirmPwdHidden, setConfirmPwdHidden] = useState(true);

  const { login } = useContext(AuthContext);

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

        if (response.data.token) {
          login(response.data.token, response.data.id);
          router.navigate("home/rooms");
        }
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
      keyboardVerticalOffset={100}
      style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <View>
          <Logo />
          <Title title="Sign up" />
        </View>
        <View style={styles.form}>
          <Input
            type="input"
            placeholder="email"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            type="input"
            placeholder="username"
            value={username}
            onChangeText={setUsername}
          />
          <Input
            type="inputMultiline"
            placeholder="Describe yourself in a few words..."
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={pwdHidden}
            setHidden={setPwdHidden}
          />
          <Input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={confirmPwdHidden}
            setHidden={setConfirmPwdHidden}
          />
        </View>
        <View style={styles.section}>
          {errorMessage && <ErrorText errorMessage={errorMessage} />}
          <SubmitButton
            title="Sign up"
            onPress={onSubmit}
            isLoading={isLoading}
            disabled={isLoading}
          />
          <RedirectButton
            text="Already have an account ? Sign in"
            onPress={() => {
              router.back();
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
    paddingBlockEnd: 50,
    flex: 1,
  },
  content: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingInline: 40,
    gap: 20,
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
