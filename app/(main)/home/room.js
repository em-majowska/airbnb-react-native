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
import MapView, { Marker } from "react-native-maps";

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
        console.log(response.data.location);

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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <RoomOffer item={item} />
          <Text style={styles.description} numberOfLines={3}>
            {item.description}
          </Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 48.856614,
              longitude: 2.3522219,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}>
            <Marker
              coordinate={{
                longitude: item.location[0],
                latitude: item.location[1],
              }}
            />
          </MapView>
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
  scrollContainer: {
    gap: 20,
  },
  description: {
    paddingInline: 16,
    fontSize: 14,
    lineHeight: 20,
  },
  map: {
    height: 350,
  },
});

export default room;
