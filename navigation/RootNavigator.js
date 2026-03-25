import { Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const RootNavigator = () => {
  const { userToken, userId } = useContext(AuthContext);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!userToken || !userId}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={userToken && userId}>
        <Stack.Screen name="(main)" />
      </Stack.Protected>
    </Stack>
  );
};
export default RootNavigator;
