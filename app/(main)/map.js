import { StyleSheet, Text, View } from "react-native";

const map = () => {
  return (
    <View style={styles.container}>
      <Text>Map</Text>
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

export default map;
