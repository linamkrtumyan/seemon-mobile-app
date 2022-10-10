import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SeemonCheck from "../../assets/SeemonCheck";
import React from "react";


export default function RegistrationSuccess({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.logo}>
        <SeemonCheck />
      </View>
      <Text style={styles.title}>Գրանցումը հաջողությամբ կատարվել է</Text>

      <TouchableOpacity
        style={styles.loginScreenButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.loginText}>Շարունակել</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    lineHeight: 31,
    textAlign: "center",
    marginTop: 70,
    marginBottom: 219,
    width: "90%",
    marginLeft: "5%",
  },
  logo: {
    alignItems: "center",
    marginTop: 121,
    marginBottom: 14,
  },

  loginScreenButton: {
    width: "90%",
    marginLeft: "5%",

    padding: 14,
    backgroundColor: "#F04A38",
    borderRadius: 8,
  },
  loginText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.24,
  },
});
