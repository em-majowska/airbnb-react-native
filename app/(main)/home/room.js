import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../../components/Header";
import axios from "axios";
import RoomOffer from "../../../components/RoomOffer";

const room = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState(true);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/" +
            id,
        );
        setItem(response.data);
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.data.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <View style={styles.container}>
      <Header />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <RoomOffer item={item} />
          <Text style={styles.description} numberOfLines={3}>
            {item.description}
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    paddingInline: 16,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default room;
