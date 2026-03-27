import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Entypo from "@expo/vector-icons/Entypo";
import colors from "../../assets/colors/main.json";
import { Link, useRouter } from "expo-router";

const map = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState({});
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});

        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        // const obj = {
        //   latitude: 48.856614,
        //   longitude: 2.3522219,
        // };

        setCoords(obj);
      } else {
        setError(true);
      }

      setIsLoading(false);
    };

    askPermission();
  }, []);

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${coords.latitude}&longitude=${coords.longitude}`,
          );

          setMarkers(response.data);
          setIsLoading(false);
        } catch (error) {
          error.message && console.log(error.message);
          error.response && console.log(error.response.data);
        }
      };
      fetchData();
    }
  }, [coords]);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>Permission denied</Text>
      ) : (
        <MapView
          style={styles.map}
          showsUserLocation={true}
          initialRegion={{
            // latitude: 48.856614,
            // longitude: 2.3522219,
            latitude: coords.latitude || 48.856614,
            longitude: coords.longitute || 2.3522219,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}>
          {markers &&
            markers.map((marker) => {
              return (
                <Marker
                  key={marker._id}
                  tappable={true}
                  onPress={() => router.push(`/home/room?id=${marker._id}`)}
                  icon={
                    <Entypo name="location-pin" size={50} color={colors.pink} />
                  }
                  coordinate={{
                    latitude: marker.location[1],
                    longitude: marker.location[0],
                  }}
                />
              );
            })}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  map: {
    flex: 1,
    backgroundColor: "black",
  },
  marker: {
    width: 60,
    height: 120,
    padding: 10,
  },
});

export default map;
