import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import FacebookIcon from "../../../assets/FacebookIcon";
import InstagramIcon from "../../../assets/InstagramIcon";
import request from "../../../request";
import { useToast } from "react-native-toast-notifications";

export default function ContactUs() {
  const toast = useToast();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const emailValidation = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (text.length > 0 && reg.test(text) === false) {
      setEmailErrorMessage("Email is Not Correct");
      setEmail(text);
      return false;
    } else {
      setEmail(text);
      setEmailErrorMessage("");
    }
  };

  const send = () => {
    request("/api-frontend/Common/ContactUsSend", "POST", {
      email: email,
      subject: "",
      subject_enabled: true,
      enquiry: description,
      full_name: name,
      phone: phone,
      successfully_sent: true,
      result: "",
      display_captcha: true,
      custom_properties: {},
    })
      .then(({data, headerData}) => {
        if (data.successfully_sent) {
          toast.show(`${data.result}`);
          setName("");
          setPhone("");
          setEmail("");
          setDescription("");
        }
      })
      .catch((e) => {
        console.log(e, "contact us error");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Կապ մեզ հետ</Text>
      <View style={styles.socialNetworks}>
        <TouchableOpacity style={styles.networkIcon}>
          <FacebookIcon />
        </TouchableOpacity>

        <TouchableOpacity>
          <InstagramIcon />
        </TouchableOpacity>
      </View>

      <Text style={{color:"#000"}} >Ուղարկել հաղորդագրոթյուն</Text>
      <TextInput  placeholderTextColor="#8F8F8F"

        style={styles.input}
        placeholder="Անուն"
  
        value={name}
        onChangeText={setName}
        keyboardType="default"
      />
      <TextInput  placeholderTextColor="#8F8F8F"

        style={styles.input}
        placeholder="Հեռախոսահամար"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput  placeholderTextColor="#8F8F8F"

        style={styles.input}
        placeholder="Էլ. հասցե"
        value={email}
        // onChangeText={setEmail}
        onChangeText={(text) => emailValidation(text)}
        keyboardType="email-address"
      />
      {emailErrorMessage.length > 0 && (
        <Text style={styles.textDanger}>{emailErrorMessage}</Text>
      )}
      <TextInput  placeholderTextColor="#8F8F8F"

        style={[styles.input, styles.textarea]}
        placeholder="Հաղորդագրություն"
        value={description}
        onChangeText={setDescription}
        keyboardType="default"
      />
      <TouchableOpacity
        disabled={name && email && description ? false : true}
        style={[
          styles.nextButton,
          name && email && description
            ? styles.enableButton
            : styles.disableButton,
        ]}
        onPress={() => send()}
      >
        {/* <LogoutIcon/> */}
        <Text style={styles.nextButtonText}>Ուղարկել</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: "5%",
    marginTop: 44,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 24,
    color:"#000"
  },
  socialNetworks: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 48,
  },
  networkIcon: {
    marginRight: 24,
  },
  input: { color: "#000",
    borderWidth: 1,
    borderColor: "#A5DACF",
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginTop: 16,
    
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
    paddingVertical: 14,
  },
  nextButton: {
    width: "100%",
    // padding: 10,
    backgroundColor: "#F04A38",
    borderRadius: 8,
    marginBottom: 20,
    paddingVertical: 12,
    marginTop: 16,
    // flex:1,
    // flexDirection:"row",
    // alignItems:"center",
    // justifyContent:"center"
    // height:40
  },
  nextButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
    // padding:10
  },
  disableButton: {
    opacity: 0.5,
  },
  enableButton: {
    opacity: 1,
  },
  textDanger: {
    color: "#dc3545",
    fontSize: 12,
  },
});
