import { Tabs } from "expo-router";
import colors from "../../assets/colors/main.json";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.pink,
        inactiveTintColor: colors.grey,
      }}>
      <Tabs.Screen
        name="map"
        options={{
          title: "Around Me",
          tabBarIcon: ({ color }) => {
            return <Feather name="map-pin" size={24} color={color} />;
          },
          tabBarLabelStyle: { fontSize: 14 },
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="home" size={24} color={color} />;
          },

          tabBarLabelStyle: { fontSize: 14 },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "My profile",
          tabBarIcon: ({ color }) => {
            return <MaterialIcons name="person" size={24} color={color} />;
          },
          tabBarLabelStyle: { fontSize: 14 },
        }}
      />
    </Tabs>
  );
}
