import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import colors from "../../assets/colors/main.json";
import Input from "../../components/Input";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SubmitButton from "../../components/SubmitButton";
import * as ImagePicker from "expo-image-picker";

const profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState();
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPicture, setSelectedPicture] = useState(null);

  const { userId, userToken, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/" +
            userId,
          {
            headers: { Authorization: "Bearer " + userToken },
          },
        );
        const user = response.data;
        setUser(user);
        // setSelectedPicture(user.photo?.url);
        setEmail(user.email);
        setUsername(user.username);
        setDescription(user.description);
        setIsLoading(false);
      } catch (error) {
        error.message && console.log(error.message);
        error.response && console.log(error.response.data.message);
      }
    };

    fetchData();
  }, [userId]);

  const updateUser = async () => {
    setIsSubmitting(true);

    try {
      const promises = [];

      if (selectedPicture) {
        promises.push(sendData());
        promises.push(sendPhoto());
        const response = await Promise.all(promises);
        setSuccess(true);
      }
      promises.push(sendData());
      const response = await Promise.all(promises);
      setSuccess(true);
    } catch (error) {
      error.message && console.log(error.message);
      error.response && console.log(error.response.data);
    }

    setIsSubmitting(false);
  };

  const getPermissionOpenGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (result.canceled) {
        alert("Photo was not selected");
      } else {
        setSelectedPicture(result.assets[0].uri);
      }
    } else {
      alert("Permission denied");
    }
  };

  const getPermissionTakePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();

      if (result.canceled) {
        alert("Photo was not selected");
      } else {
        setSelectedPicture(result.assets[0].uri);
      }
    } else {
      alert("Permission denied");
    }
  };

  const sendPhoto = () => {
    const tab = selectedPicture.split(".");

    const formData = new FormData();
    formData.append("photo", {
      uri: selectedPicture,
      name: `avatar.${tab[tab.length - 1]}`,
      type: `image/${tab[tab.length - 1]}`,
    });

    const promise = axios.put(
      "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture",
      formData,
      {
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return promise;
  };

  const sendData = () => {
    const promise = axios.put(
      "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update",
      {
        email,
        description,
        username,
      },
      {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      },
    );

    return promise;
  };

  return (
    <View style={styles.container}>
      <Header type="sm" />
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.content}>
            <View style={styles.top}>
              <View style={styles.avatarContainer}>
                {user.photo?.url ? (
                  <Image
                    source={{ uri: selectedPicture || user.photo.url }}
                    style={styles.avatar}
                    renderMode="cover"
                  />
                ) : selectedPicture ? (
                  <Image
                    source={{ uri: selectedPicture }}
                    style={styles.avatar}
                    renderMode="cover"
                  />
                ) : (
                  <MaterialIcons name="person" size={100} color={colors.grey} />
                )}
              </View>
              <View style={styles.buttons}>
                <Pressable
                  onPress={getPermissionOpenGallery}
                  style={styles.iconButton}>
                  <MaterialIcons
                    name="photo-library"
                    size={40}
                    color={colors.grey}
                  />
                </Pressable>
                <Pressable
                  onPress={getPermissionTakePicture}
                  style={styles.iconButton}>
                  <MaterialIcons
                    name="camera-alt"
                    size={40}
                    color={colors.grey}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.form}>
              <Input
                type="input"
                placeholder="email"
                value={email}
                onChangeText={setEmail}
              />
              <Input
                type="input"
                placeholder="username"
                value={username}
                onChangeText={setUsername}
              />
              <Input
                type="inputMultiline"
                placeholder="Describe yourself in a few words..."
                value={description}
                onChangeText={setDescription}
                multiline={true}
              />
            </View>
            <View style={styles.buttons}>
              {success && (
                <Text style={styles.relative}>
                  Account successfully updated!
                </Text>
              )}
              {isSubmitting ? (
                <ActivityIndicator />
              ) : (
                <SubmitButton title="Update" onPress={updateUser} />
              )}
              <SubmitButton title="Log Out" onPress={logout} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    gap: 50,
    paddingInline: 30,
    flex: 1,
    justifyContent: "space-between",
  },
  top: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    gap: 30,
    paddingBlock: 20,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.lightpink,
    borderWidth: 2,
    borderRadius: 150,
    padding: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  buttons: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  form: {
    gap: 30,
  },
  relative: {
    position: "absolute",
    top: "-30",
    color: colors.pink,
  },
});

export default profile;
