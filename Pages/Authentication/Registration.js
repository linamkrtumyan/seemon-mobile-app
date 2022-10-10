import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import SeemonAuthLogo from "../../assets/SeemonAuthLogo";
import CheckedIcon from "../../assets/CheckedIcon";
import UncheckedIcon from "../../assets/UncheckedIcon";
import request from "../../request";
import { useToast } from "react-native-toast-notifications";
import lang from "../../lang.json";
import { AuthContext } from "../../App";

export default function Registration({ navigation }) {
  const toast = useToast();
  const appContext = React.useContext(AuthContext);

  const [isSelected, setIsSelected] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("+374");

  let windowWidth =
    Dimensions.get("window").width - Dimensions.get("window").width * 0.11 - 80;

  const termOfUse = () => {
    setIsSelected((prev) => !prev);
  };

  const navigateToTermOfUseScreen = () => {
    navigation.navigate("TermOfUse");
  };

  const signUp = () => {
    if (!isNaN(phone)) {
      request(`/api-frontend/Customer/Register`, "POST", {
        model: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phoneCode + phone,
        },

        form: {
          controlId: "",
        },
      })
        .then(({ data, headerData }) => {
          if (data.Success) {
            navigation.navigate("SignUpCodeVerification", {
              customerId: data.CustomerId,
              username: phoneCode + phone,
            });
          } else {
            toast.show(data.Message);
          }
        })
        .catch((e) => {
          console.log(e, "Register error");
        });
    } else {
      toast.show(lang[appContext.state.lang].errors.invalidInput);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.title}>
        {lang[appContext.state.lang].auth.createAccount}
      </Text>
      <View style={styles.logo}>
        <SeemonAuthLogo />
      </View>

      <View>
        <TextInput
          placeholderTextColor="#8F8F8F"
          style={styles.input}
          value={firstName}
          placeholder={lang[appContext.state.lang].placeholder.firstname}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholderTextColor="#8F8F8F"
          style={styles.input}
          value={lastName}
          placeholder={lang[appContext.state.lang].placeholder.lastname}
          onChangeText={setLastName}
        />
        <TextInput
          placeholderTextColor="#8F8F8F"
          style={styles.input}
          value={email}
          placeholder={lang[appContext.state.lang].placeholder.email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <View style={styles.phoneInputContainer}>
          <TextInput
            placeholderTextColor="#8F8F8F"
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
              borderRadius: 8,
              padding: 10,
              marginTop: 16,
              paddingRight: 50,
              width: windowWidth,
              color: "#000",
            }}
            value={phone}
            placeholder=" _  _  _  _  _  _  _  _ "
            onChangeText={setPhone}
            maxLength={8}
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={termOfUse}
          >
            {isSelected ? <CheckedIcon /> : <UncheckedIcon />}
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            <Text style={{ color: "#000" }} onPress={termOfUse}>
              {lang[appContext.state.lang].auth.accept}{" "}
            </Text>
            <Text
              onPress={navigateToTermOfUseScreen}
              style={{ color: "#3088f1" }}
            >
              {lang[appContext.state.lang].auth.termsOfUse}
            </Text>{" "}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.loginScreenButton,
            firstName && lastName && email && phone.length === 8 && isSelected
              ? styles.enableButton
              : styles.disableButton,
          ]}
          onPress={signUp}
          disabled={
            firstName && lastName && email && phone.length === 8 && isSelected
              ? false
              : true
          }
        >
          <Text style={styles.loginText}>
            {lang[appContext.state.lang].button.continue}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.textForRegistration}>
        {lang[appContext.state.lang].auth.haveAnAccount}
      </Text>

      <TouchableOpacity
        style={styles.registerScreenButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.registerText}>
          {lang[appContext.state.lang].button.signIn}
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
    color: "#000",
  },
  logo: {
    alignItems: "center",
    marginTop: 27,
    marginBottom: 14,
  },
  input: {
    color: "#000",
    borderWidth: 1,
    marginLeft: "5%",
    borderColor: "#A5DACF",
    height: 44,
    width: "90%",
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
    paddingRight: 50,
  },
  link: {
    color: "#005DCA",
    fontSize: 12,

    textAlign: "right",
    marginRight: "5%",
    marginTop: 12,
    marginBottom: 24,
    lineHeight: 15,
  },
  primaryButton: {
    backgroundColor: "#00aeef",
    borderColor: "red",
    borderWidth: 5,
    borderRadius: 15,
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
    color: "#8f8f8f",
  },
  phoneInput: {
    borderWidth: 1,
    marginLeft: "1%",
    borderColor: "#A5DACF",
    height: 44,
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
    paddingRight: 50,
    width: "100%",
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
    color: "#000",
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
  imageStyle: {
    position: "absolute",
    right: "10%",
    top: "50%",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 26,
    marginBottom: 26,
    marginLeft: "5%",
  },
  checkboxText: {
    fontSize: 11,
    marginLeft: 5,
  },
  checkbox: {
    color: "red",
    borderBottomColor: "red",
  },
});
