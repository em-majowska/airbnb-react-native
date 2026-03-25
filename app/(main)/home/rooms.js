import { StyleSheet, Text, View } from "react-native";

const rooms = () => {
  return (
    <View style={styles.container}>
      <Text>Rooms</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default rooms;
