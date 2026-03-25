import { AuthContextProvider } from "../context/AuthContext";
import RootNavigator from "../navigation/RootNavigator";

export default function Layout() {
  return (
    <AuthContextProvider>
      <RootNavigator />
    </AuthContextProvider>
  );
  // return <Stack screenOptions={{ headerShown: false }} />;
}
