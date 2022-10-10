import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import SeemonFailedIcon from "../../../assets/SeemonFailedIcon";

export default function OrderFailed() {
  const navigation = useNavigation();

  const appContext = React.useContext(AuthContext);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <SeemonFailedIcon />

        <Text style={styles.text}>
          {/* {lang[`${appContext.state.lang}`].favoritesPage.emptyMessage} */}
          Տեղի է ունեցել սխալ
        </Text>
        <Text>Ձեր պատվերը չի գրանցվել</Text>
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.nextButtonText}>Վերադառնալ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  text: {
    fontSize: 18,
    lineHeight: 22,
    marginTop: 45,
  },
  wrapper: {
    flexDirection: "column",
    flex: 1,
    marginTop: 44,
    paddingHorizontal: "5%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    width: "100%",
    padding: 14,
    backgroundColor: "#F04A38",
    borderRadius: 8,
    marginBottom: 20,
  },
  nextButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
});
