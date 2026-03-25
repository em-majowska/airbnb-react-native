import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import Logo from "../../../components/Logo";
import colors from "../../../assets/colors/main.json";
import RoomOffer from "../../../components/RoomOffer";

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

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo type="sm" />
      </View>
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => <RoomOffer item={item} />}
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
  header: {
    width: "100%",
    marginTop: Constants.statusBarHeight,
    paddingBlock: 10,
    borderBottomWidth: 2,
    borderColor: colors.lightgrey,
    alignItems: "center",
  },
  list: {
    paddingBlockEnd: "50",
  },
});

export default rooms;
