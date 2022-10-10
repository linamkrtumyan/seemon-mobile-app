import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import SeemonAuthLogo from "../../../assets/SeemonAuthLogo";
import { AuthContext } from "../../../App";
import request from "../../../request";
import lang from "../../../lang.json";
import OtpAutoFillViewManager from "react-native-otp-auto-fill";

export default function LoginCodeVerification({ route, navigation }) {
  const auth = React.useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(auth.state.userMessage);
  const { username } = route.params;
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [code, setCode] = useState("");
  const [otp, setOtp] = useState("");

  const handleComplete = ({ nativeEvent: { code } }) => {
    setCode(code);
  };

  const handleOnAndroidSignature = ({ nativeEvent: { code } }) => {
    setCode(code);
    console.log("Android Signature Key for SMS body:", code);
  };

  useEffect(() => {
    setErrorMessage(auth.state.userMessage);
  }, [auth.state.userMessage]);

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

  const sendCode = () => {
    setMinutes(5);
    request("/api-frontend/Authenticate/SendCode", "POST", {
      phone_number: username,
      is_active: true,
    })
      .then(({ data, headerData }) => {})
      .catch((e) => {});
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.logoContainer}>
          <SeemonAuthLogo />
        </View>
        {minutes == 0 && seconds == 0 ? (
          <TouchableOpacity onPress={sendCode}>
            <Text style={styles.link}>
              {lang[auth.state.lang].auth.sendAgain}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={{ marginTop: 20, fontSize: 25, color: "#000" }}>
            {" "}
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        )}
        <Text style={styles.hintMessage}>
          {lang[auth.state.lang].auth.sendMessage}
        </Text>

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

        <Text style={styles.errorText}>{errorMessage}</Text>

        <TouchableOpacity
          style={[
            styles.nextButton,
            code.length === 4 ? styles.enableButton : styles.disableButton,
          ]}
          onPress={() => auth.authContext.signIn({ username, code })}
          disabled={code.length === 4 ? false : true}
        >
          <Text style={styles.nextButtonText}>
            {lang[auth.state.lang].button.signIn}
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
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 100,
    textAlign: "center",
    letterSpacing: -0.24,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  hintMessage: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 25,
    color: "#000",
  },
  input: {
    color: "#000",
    borderWidth: 1,
    borderColor: "#A5DACF",
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginTop: 16,
    width: "30%",
    textAlign: "center",
    alignContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  nextButton: {
    width: "50%",
    padding: 14,
    backgroundColor: "#F04A38",
    borderRadius: 8,
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
  errorText: {
    color: "#B70202",
    width: "90%",
    marginLeft: "5%",
    fontSize: 12,
    marginTop: 20,
    lineHeight: 15,
    letterSpacing: -0.24,
    textAlign: "center",
  },
  link: {
    color: "#005DCA",
    fontSize: 14,
    marginRight: "5%",
    marginTop: 24,
  },
  box: {
    width: 200,
    height: 35,
    marginVertical: 10,
  },
});
