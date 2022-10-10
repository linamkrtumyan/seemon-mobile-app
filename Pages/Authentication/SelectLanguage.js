import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";


export default function SelectLanguage({ navigation }) {
  var logo = require("../../assets/bigLogo.png");

  return (
    <ScrollView>
      <View style={styles.logo}>
        <Image style={styles.logoImage} source={logo} />
      </View>

      <TouchableOpacity
        style={styles.languageScreenButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>Հայերեն</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.languageScreenButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>Русский</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.languageScreenButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>English</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignItems: "center",
    marginTop: 167,
    marginBottom: 107,
  },

  languageScreenButton: {
    width: "90%",
    marginLeft: "5%",
    padding: 14,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#A5DACF",
    marginBottom: 24,
  },
  loginText: {
    color: "#000000",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.24,
  },
});
