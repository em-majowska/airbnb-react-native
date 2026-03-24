import { Link, useRouter } from "expo-router";
import { View, StyleSheet, TextInput } from "react-native";
import Header from "./components/Header";

import colors from "../assets/colors/main.json";

const router = useRouter();

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Header title="Airbnb" />

      <View>
        <Link href="/SignIn" style={styles.link}>
          Log in
        </Link>
        <Link href="/SignUp" style={styles.link}>
          Register
        </Link>
      </View>
    </View>
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
  link: {
    color: colors.grey,
    textAlign: "center",
    fontSize: 24,
  },
});
