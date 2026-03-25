import { Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function RootNavigator() {
  const { userToken, userId } = useContext(AuthContext);

  return (
    <Stack>
      <Stack.Protected guard={!userToken || !userId}>
        <Stack.Screen name="index" />
      </Stack.Protected>

      <Stack.Protected guard={userToken && userId}>
        <Stack.Screen name="home/rooms" />
      </Stack.Protected>
    </Stack>
  );
}
