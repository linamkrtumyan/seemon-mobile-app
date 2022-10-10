import React,  { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Dimensions,
} from "react-native";
import SeemonAuthLogo from "../../../assets/SeemonAuthLogo";
import { AuthContext } from "../../../App";
import request from "../../../request";
import { useToast } from "react-native-toast-notifications";
import lang from "../../../lang.json";

export default function Login({ navigation }) {
  const toast = useToast();

  const appContext = React.useContext(AuthContext);

  let windowWidth =
    Dimensions.get("window").width - Dimensions.get("window").width * 0.11 - 80;

  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    appContext.state.userMessage
  );
  const [phoneCode, setPhoneCode] = useState("+374");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setUsername("");
      setErrorMessage("");
    });
    return unsubscribe;
  }, [navigation]);

  const sendCode = () => {
    if (!isNaN(username) ) {
      request("/api-frontend/Authenticate/SendCode", "POST", {
        phone_number: phoneCode + username,
        is_active: true,
      })
        .then(({ data, headerData }) => {
          if (data.Success) {
            navigation.navigate("LoginCodeVerification", {
              username: phoneCode + username,
            });
          } else {
            toast.show(data.Message);
          }
        })
        .catch((e) => {});
    } else {
      toast.show(lang[appContext.state.lang].errors.invalidInput);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.title}>
        {lang[`${appContext.state.lang}`].button.signIn}
      </Text>
      <View style={styles.logo}>
        <SeemonAuthLogo />
      </View>

      <View>
        <View style={styles.sectionStyle}>
          <View style={[styles.phoneInputContainer]}>
            <TextInput  placeholderTextColor="#8F8F8F"

              style={[styles.phoneCodeInput]}
              value={phoneCode}
              editable={false}
            />
            <TextInput 
             placeholderTextColor="#8F8F8F"

              style={{
                borderWidth: 1,
                marginLeft: 5,
                borderColor: "#A5DACF",
                height: 44,
                // width: "90%",
                borderRadius: 8,
                padding: 10,
                marginTop: 16,
                paddingRight: 50,
                width: windowWidth,
                color:"#000"
              }}
              value={username}
              placeholder=" _  _  _  _  _  _  _  _ "
              onChangeText={setUsername}
              maxLength={8}
              keyboardType="number-pad"
            />
          </View>
        </View>

        <Text style={styles.errorText}>{errorMessage}</Text>

        <TouchableOpacity
          style={[
            styles.loginScreenButton,
            username.length === 8 ? styles.enableButton : styles.disableButton,
          ]}
          disabled={username.length === 8 ? false : true}
          onPress={() => {
            Keyboard.dismiss();
            sendCode();
          }}
        >
          <Text style={styles.loginText}>
            {lang[`${appContext.state.lang}`].button.continue}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.textForRegistration}>
        {lang[`${appContext.state.lang}`].auth.dontHaveAnAccount}
      </Text>

      <TouchableOpacity
        style={styles.registerScreenButton}
        onPress={() => navigation.navigate("Registration")}
      >
        <Text style={styles.registerText}>
          {lang[`${appContext.state.lang}`].button.signUp}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    lineHeight: 30,
    textAlign: "center",
    marginTop: 98,
    color:"#000"
  },
  logo: {
    alignItems: "center",
    marginTop: 27,
    marginBottom: 14,
  },

  loginScreenButton: {
    width: "90%",
    marginLeft: "5%",
    padding: 14,
    backgroundColor: "#F04A38",
    borderRadius: 8,
  },

  disableButton: {
    opacity: 0.5,
  },
  enableButton: {
    opacity: 1,
  },
  loginText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.24,
  },
  textForRegistration: {
    textAlign: "center",
    marginTop: 44,
    marginBottom: 12,
    fontSize: 13,
    letterSpacing: -0.24,
    lineHeight: 16,
    color:"#000"
  },
  registerScreenButton: {
    width: "90%",
    marginLeft: "5%",
    padding: 14,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F04A38",
  },
  registerText: {
    color: "#F04A38",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.24,
  },

  sectionStyle: {
    position: "relative",
  },

  errorText: {
    color: "#B70202",
    width: "90%",
    marginLeft: "5%",
    fontSize: 12,
    marginTop: 6,
    lineHeight: 15,
    letterSpacing: -0.24,
  },
  phoneInputContainer: {
    flexDirection: "row",
    width: "100%",
  },
  phoneCodeInput: {
    borderWidth: 1,
    marginLeft: "5%",
    borderColor: "#A5DACF",
    height: 44,
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
    width: 80,
    color:"#8F8F8F"
  },
});
