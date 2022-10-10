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
import {  useState } from "react";
import SeemonAuthLogo from "../../../assets/SeemonAuthLogo";
import PasswordInputOpenIcon from "../../../assets/PasswordInputOpenIcon";
import PasswordInputIcon from "../../../assets/PasswordInputIcon";

export default function ForgotPassword({ navigation }) {
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <Text style={styles.title}>Ստեղծել Նոր Գաղտնաբառ</Text>
        <View style={styles.logoContainer}>
          <SeemonAuthLogo />
        </View>

        <View style={styles.sectionStyle}>
          <TextInput  placeholderTextColor="#8F8F8F"

            style={[{ flex: 1 }, styles.input]}
            value={password}
            placeholder="Նոր գաղտնաբառ*"
            
            secureTextEntry={showPassword ? false : true}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.imageStyle}
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            {showPassword ? <PasswordInputOpenIcon /> : <PasswordInputIcon />}
          </TouchableOpacity>
        </View>

        <View style={styles.sectionStyle}>
          <TextInput  placeholderTextColor="#8F8F8F"

            style={[{ flex: 1 }, styles.input]}
            value={confirmPassword}
            placeholder="Կրկնել գաղտնաբառը*"
            secureTextEntry={showConfirmPassword ? false : true}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.imageStyle}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            {/* <Image source={eye} /> */}
            {showConfirmPassword ? (
              <PasswordInputOpenIcon />
            ) : (
              <PasswordInputIcon />
            )}
          </TouchableOpacity>
        </View>

      

        <TouchableOpacity
          style={[
            styles.nextButton,
            // phone ? styles.enableButton : styles.disableButton,
          ]}
          // style={{position:"absolute", bottom:50}}
          // onPress={addAddress}
          onPress={() => navigation.navigate("CodeVerification")}
          // disabled={phone ? false : true}
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
  sectionStyle: {
    position: "relative",
  },
  imageStyle: {
    position: "absolute",

    right: "5%",
    top: "50%",
    // display:"flex",
    // flexDirection:"column",
    // justifyContent:"center",
    // alignItems:"center"

    // resizeMode: "stretch",
    // alignItems: "center",
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
    paddingRight: 50,
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
