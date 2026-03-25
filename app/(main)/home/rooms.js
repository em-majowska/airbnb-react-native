import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import colors from "../../../assets/colors/main.json";
import RoomOffer from "../../../components/RoomOffer";
import Header from "../../../components/Header";
import { Link } from "expo-router";

const rooms = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms",
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.data.message);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) =>
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <Link href={`/home/room?id=${item._id}`} style={styles.link}>
              <RoomOffer item={item} />
            </Link>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
  },
  list: {
    paddingBlockEnd: "50",
  },
  link: {
    borderBottomWidth: 2,
    borderColor: colors.lightgrey,
  },
});

export default rooms;
