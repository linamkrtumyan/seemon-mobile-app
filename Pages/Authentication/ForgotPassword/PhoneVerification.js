import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { useState } from "react";
import SeemonAuthLogo from "../../../assets/SeemonAuthLogo";

export default function PhoneVerification({ navigation }) {
  const [phone, setPhone] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => setPhone(null)}
        />
      }
    >
      <SafeAreaView style={styles.wrapper}>
        <Text style={styles.title}>Մոռացե՞լ եք Գաղտնաբառը</Text>
        <View style={styles.logoContainer}>
          <SeemonAuthLogo />
        </View>

        <Text style={styles.hintMessage}>
          Մուտքագրեք ձեր հեռախոսահամարը 4 նիշանոց թիվը ստանալու համար
        </Text>
        <TextInput  placeholderTextColor="#8F8F8F"

          style={styles.input}
          placeholder="+374"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TouchableOpacity
          style={[
            styles.nextButton,
            phone ? styles.enableButton : styles.disableButton,
          ]}
          // style={{position:"absolute", bottom:50}}
          // onPress={addAddress}
          onPress={() => navigation.navigate("CodeVerification") }
          disabled={phone ? false : true}
        >
          <Text style={styles.nextButtonText}>Շարունակել</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: "5%",
    // flex:1,
    // flexDirection:"column",
    // justifyContent:"center",
    // alignItems:"center",
    width: "90%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 100,
    // width:"70%",
    textAlign: "center",
    letterSpacing: -0.24,
    // marginLeft:"5%",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // width:"100%"
    // textAlign:"center"
  },
  hintMessage: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 65,
    // width:"80%"
  },
  input: { color: "#000",
    borderWidth: 1,
    borderColor: "#A5DACF",
    height: 44,
    // width: "25%",
    borderRadius: 8,
    // padding: 14,
    paddingHorizontal: 14,
    marginTop: 16,
    width: "100%",
  },
  nextButton: {
    width: "100%",
    padding: 14,
    backgroundColor: "#F04A38",
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 20,
  },
  nextButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  disableButton: {
    opacity: 0.5,
  },
  enableButton: {
    opacity: 1,
  },
});
