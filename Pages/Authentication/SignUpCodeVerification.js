import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import SeemonAuthLogo from "../../assets/SeemonAuthLogo";
import request from "../../request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../App";
import lang from "../../lang.json";
import OtpAutoFillViewManager from "react-native-otp-auto-fill";

export default function SignUpCodeVerification({ route }) {
  const auth = React.useContext(AuthContext);
  const { customerId, username } = route.params;
  const [code, setCode] = useState("");
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const handleComplete = ({ nativeEvent: { code } }) => {
    setCode(code);
  };

  const handleOnAndroidSignature = ({ nativeEvent: { code } }) => {
    setCode(code);
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const verify = () => {
    request(`/api-frontend/Customer/ValidationPhoneCode`, "POST", {
      Valid_code: code,
      Customer_id: customerId,
    })
      .then(({ data, headerData }) => {
        if (data.Success) {
          let headers = headerData.get("set-cookie");
          let authToken = headers.split(",")[4].split(";")[0].split("=")[1];
          AsyncStorage.setItem("authToken", String(authToken));
          AsyncStorage.setItem("token", String(data.res.token)),
            AsyncStorage.setItem(
              "cartItemCount",
              String(data.res.shopping_cart_items_count)
            );

          auth.authContext.signUp(data.res.token);
        } else {
        }
      })
      .catch((e) => {
        console.log(e, "Register error");
      });
  };

  const sendCode = () => {
    setMinutes(5);
    request("/api-frontend/Authenticate/SendCode", "POST", {
      phone_number: username,
      is_active: false,
    })
      .then(({ data, headerData }) => {})
      .catch((e) => {});
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.wrapper}>
        {/* <Text style={styles.title}>
          {lang[auth.state.lang].auth.createAccount}
        </Text> */}
        <View style={styles.logo}>
          <SeemonAuthLogo />
        </View>

        {minutes == 0 && seconds == 0 ? null : (
          <Text
            style={{
              marginTop: 20,
              fontSize: 25,
              textAlign: "center",
              color: "#000",
            }}
          >
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        )}

        {/* <View style={styles.inputContainer}> */}
          <View
            style={{
              borderColor: "#A5DACF",
              borderWidth: 1,
              marginTop: 25,
              borderRadius: 8,
            }}
          >
            <OtpAutoFillViewManager
              onComplete={handleComplete}
              onAndroidSignature={handleOnAndroidSignature}
              style={styles.box}
              length={4} // Define the length of OTP code. This is a must.
            />
          </View>
        {/* </View> */}
        <Text style={styles.textForRegistration}>
          {lang[auth.state.lang].auth.smsNoSendMessage}
        </Text>
        {/* <TouchableOpacity > */}
          <Text onPress={sendCode} style={styles.link}>
            {lang[auth.state.lang].auth.sendAgain}
          </Text>
        {/* </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.loginScreenButton}
          onPress={() => verify()}
          disabled={code.length === 4 ? false : true}
        >
          <Text style={styles.loginText}>
            {lang[auth.state.lang].button.next}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
    height: "100%",
    marginTop: "20%",
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    textAlign: "center",
    marginTop: 98,
    color:"#000"
  },

  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  loginScreenButton: {
    width: "50%",
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
  textForRegistration: {
    textAlign: "center",
    marginTop: 44,
    marginBottom: 12,
    fontSize: 13,
    letterSpacing: -0.24,
    lineHeight: 16,
    color: "#000",
  },
  link: {
    color: "#0B73EE",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 13,
    letterSpacing: -0.24,
    lineHeight: 16,
  },
  box: {
    width: 200,
    height: 35,
    marginVertical: 10,
  },
});
