import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import lang from "../../../lang.json";
import { AuthContext } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import SeemonSuccess from "../../../assets/SeemonSuccess";
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function OrderCompleted({route}) {
  const navigation = useNavigation();

  const appContext = React.useContext(AuthContext);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        

        <SeemonSuccess />

        <Text style={styles.text}>
        {route.params.message[0]}
        </Text>
        <Text style={styles.subText} >{route.params.message[1]}</Text>

        {/* <HTMLView value={route.params.message[]} stylesheet={styles.message} /> */}
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          AsyncStorage.removeItem('cartItemCount')
          navigation.popToTop();
          // navigation.navigate('HomeStackScreen', { screen: 'Home' });
        }}
      >
        <Text style={styles.nextButtonText}>{lang[appContext.state.lang].button.continue}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  text: {
    fontSize: 20,
    lineHeight: 24,
    marginTop: 34,
    marginBottom:16
  },
  subText: {
    fontSize:16,
    lineHeight:20
  },
  wrapper: {
    flexDirection: "column",
    flex: 1,
    marginTop: 44,
    paddingHorizontal: "5%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    width: "100%",
    padding: 14,
    backgroundColor: "#F04A38",
    borderRadius: 8,
    marginBottom: 20,
  },
  nextButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
  },

});
