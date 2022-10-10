import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView
  } from "react-native";
  import React, { useState } from "react"; 
  import request from "../../../request"
  import { useToast } from "react-native-toast-notifications";

  
  export default function EditPassword({navigation,route}) {
  
    const toast = useToast();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPasswordMessage, setOldPasswordMessage] = useState("")
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("")
    const [errorFromBack, setErrorFromBack] = useState("")
   

    const formValidation = async () => {    
      let errorFlag = false;
      
      // input validation
      if (newPassword.length == 0) {
        errorFlag = true;
        setPasswordErrorMessage("Password is required feild");
      } else if (newPassword.length < 8 ||  newPassword.length > 20) {
        errorFlag = true;
        setPasswordErrorMessage("Password should be min 8 char and max 20 char");
      } else if (newPassword !==  confirmPassword ) {
        errorFlag = true;
        setPasswordErrorMessage("Passwoad and confirm password should be same.");
      }
      
      if (confirmPassword.length == 0) {
        errorFlag = true;
        setConfirmPasswordErrorMessage("Confirm Password is required feild");
      } else if (confirmPassword.length < 8 ||  confirmPassword.length > 20) {
        errorFlag = true;
        setConfirmPasswordErrorMessage("Password should be min 8 char and max 20 char");
      }
     
      if (errorFlag) {
        
      } else {
        
          setPasswordErrorMessage("");
          setConfirmPasswordErrorMessage("");
          editPassword();
      }
  }

    
    const editPassword = async () => {
      // setErrorFromBack("");
     
      request(
        `/api-frontend/Customer/ChangePassword`,
        "POST",
        {
            old_password: oldPassword,
            new_password: newPassword,
            confirm_new_password: confirmPassword,
            custom_properties: {}
          }
      )
        .then(({data, headerData}) => {

          if(data.Success) {
            // history back anel
            // route?.params.setAddressCount(route?.params.addressCount + 1)
            navigation.goBack(); 
            toast.show(
              `${data.Message}`
            );

          } else {
            setErrorFromBack(data.Errors[0])
          }
        })
        .catch((e) => {
          console.log(e,"ChangePassword error")
        });
    };
  
  
    return (
      <View style={styles.wrapper}>
        <ScrollView>
          
          <TextInput  placeholderTextColor="#8F8F8F"

            style={styles.input}
            placeholder="Հին գաղտնաբառ"
            value={oldPassword}
            onChangeText={setOldPassword}
            keyboardType="default"
            secureTextEntry={true} 
          />
          {errorFromBack.length > 0 && <Text style={styles.textDanger}>{errorFromBack}</Text>}
          <TextInput  placeholderTextColor="#8F8F8F"

            style={styles.input}
            placeholder="Նոր գաղտնաբառ"
            value={newPassword}
            onChangeText={setNewPassword}
            keyboardType="default"
            secureTextEntry={true} 
          />         
          {passwordErrorMessage.length > 0 && <Text style={styles.textDanger}>{passwordErrorMessage}</Text>}
          <TextInput  placeholderTextColor="#8F8F8F"

            style={styles.input}
            placeholder="Կրկնել նոր գաղտնաբառ"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            keyboardType="default"
            secureTextEntry={true} 
          />
          {confirmPasswordErrorMessage.length > 0 && <Text style={styles.textDanger}>{confirmPasswordErrorMessage}</Text>}

        </ScrollView>
        <TouchableOpacity
          style={[styles.nextButton, (oldPassword && newPassword && confirmPassword)  ? styles.enableButton : styles.disableButton  ]}
          // style={{position:"absolute", bottom:50}}
          // onPress={editPassword}
          onPress={formValidation}
          disabled={(oldPassword && newPassword && confirmPassword) ? false : true}
        >
          <Text style={styles.nextButtonText}>Պահպանել</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: "column",
      flex: 1,
      marginTop: 44,
      paddingHorizontal: "5%",
      height: "100%",
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
    },
    nextButton: {
      width: "100%",
      padding: 14,
      backgroundColor: "#F04A38",
      borderRadius: 8,
      marginBottom: 20,
    },
    disableButton:{
      // backgroundColor: "#F04A38",
      opacity:0.5,
    },
    enableButton:{
      opacity:1,
      // backgroundColor: "#F04A38",
    },
    nextButtonText: {
      color: "#ffffff",
      textAlign: "center",
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: -0.24,
      opacity:1,
      zIndex:999999,
      // zIndex:9
    },
    textDanger: {
      color: "#dc3545",
      fontSize:12
  }
  });
  