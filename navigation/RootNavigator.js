import { Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function RootNavigator() {
  const { userToken, userId } = useContext(AuthContext);
  console.log(userToken);
  console.log(userId);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={userToken}>
        <Stack.Screen name="/login" />
      </Stack.Protected>

      <Stack.Protected guard={userToken}>
        <Stack.Screen name="/home/rooms" />
      </Stack.Protected>
    </Stack>
  );
}
