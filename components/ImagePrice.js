import { Image, StyleSheet, Text, View } from "react-native";

const ImagePrice = ({ item }) => {
  return (
    <View style={{ position: "relative" }}>
      <Image
        style={styles.image}
        source={{ uri: item.photos[0].url }}
        resizeMode="cover"
      />
      <Text style={styles.price}>{item.price} €</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 3 / 2,
  },
  price: {
    fontSize: 24,
    color: "white",
    backgroundColor: "black",
    padding: 10,
    position: "absolute",
    bottom: 5,
    width: 100,
    textAlign: "center",
  },
});
export default ImagePrice;
