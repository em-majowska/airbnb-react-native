import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, View } from "react-native";
import colors from "../assets/colors/main.json";
import LightText from "./LightText";

const Stars = ({ ratingValue, reviews }) => {
  return (
    <View style={styles.reviews}>
      {[1, 2, 3, 4, 5].map((item) => (
        <FontAwesome
          key={item - 1}
          name={item <= ratingValue ? "star" : "star-o"}
          size={24}
          color={colors.yellow}
        />
      ))}
      <LightText text={`${reviews} reviews`} />
    </View>
  );
};

const styles = StyleSheet.create({
  reviews: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "start",
  },
  row: {
    flexDirection: "row",
  },
});

export default Stars;
