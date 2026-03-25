import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import colors from "../assets/colors/main.json";
import Logo from "./Logo";
const Header = () => {
  return (
    <View style={styles.header}>
      <Logo type="sm" />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: "100%",
    marginTop: Constants.statusBarHeight,
    paddingBlock: 10,
    borderBottomWidth: 2,
    borderColor: colors.lightgrey,
    alignItems: "center",
  },
});
export default Header;
