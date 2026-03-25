import { Image, StyleSheet, Text, View } from "react-native";
import Heading from "../components/Heading";
import Stars from "../components/Stars";
import ImagePrice from "./ImagePrice";

const RoomOffer = ({ item }) => {
  return (
    <View style={styles.card}>
      <ImagePrice item={item} />
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
    gap: 10,
    paddingBlock: 10,
  },

  cardRow: {
    flexDirection: "row",
    paddingInline: 16,
  },
  cardData: {
    flex: 1,
  },
  avatar: {
    width: 70,
    aspectRatio: 1 / 1,
    borderRadius: 70,
  },
});

export default RoomOffer;
