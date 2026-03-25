import { Stack } from "expo-router";

const Layout = () => {
  return <Stack screenOptions={{ headerShown: false }}></Stack>;
  // return (
  //   <Stack screenOptions={{ headerStyle: { backgroundColor: "red" } }}></Stack>
  // );
};

export default Layout;
