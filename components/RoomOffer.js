import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../assets/colors/main.json";
import Heading from "../components/Heading";
import Stars from "../components/Stars";

const RoomOffer = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={{ position: "relative" }}>
        <Image
          style={styles.image}
          source={{ uri: item.photos[0].url }}
          resizeMode="cover"
        />
        <Text style={styles.price}>{item.price} €</Text>
      </View>
      <View style={styles.cardRow}>
        <View style={styles.cardData}>
          <Heading text={item.title} />
          <Stars reviews={item.reviews} ratingValue={item.ratingValue} />
        </View>
        <Image
          style={styles.avatar}
          source={{ uri: item.user.account.photo.url }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderBottomWidth: 2,
    borderColor: colors.lightgrey,
    gap: 10,
    paddingInline: 16,
    paddingBlock: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 2,
  },
  cardRow: {
    flexDirection: "row",
  },
  cardData: {
    flex: 1,
  },
  avatar: {
    width: 70,
    aspectRatio: 1 / 1,
    borderRadius: 70,
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

export default RoomOffer;
