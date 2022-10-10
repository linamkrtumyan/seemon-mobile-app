import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ProfileNavigationArrowIcon from "../../assets/ProfileNavigationArrowIcon";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../App";
import lang from "../../lang.json";

export default function More() {
  const appContext = React.useContext(AuthContext);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {lang[appContext.state.lang].more.settings}
      </Text>
      <TouchableOpacity
        style={styles.profileNavigationItem}
        onPress={() => navigation.navigate("Languages")}
      >
        <View style={styles.profileNavigationTextSide}>
          <Text style={styles.profileNavigationTitle}>
            {lang[appContext.state.lang].more.language}
          </Text>
        </View>
        <ProfileNavigationArrowIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileNavigationItem}
        onPress={() => navigation.navigate("Notifications")}
      >
        <View style={styles.profileNavigationTextSide}>
          <Text style={styles.profileNavigationTitle}>
            {lang[appContext.state.lang].more.notification}
          </Text>
        </View>
        <ProfileNavigationArrowIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileNavigationItem}
        onPress={() => navigation.navigate("AboutUs")}
      >
        <View style={styles.profileNavigationTextSide}>
          <Text style={styles.profileNavigationTitle}>
            {lang[appContext.state.lang].more.about}
          </Text>
        </View>
        <ProfileNavigationArrowIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileNavigationItem}
        onPress={() => navigation.navigate("PrivacyPolicy")}
      >
        <View style={styles.profileNavigationTextSide}>
          <Text style={styles.profileNavigationTitle}>
            {lang[appContext.state.lang].more.privacyPolicy}
          </Text>
        </View>
        <ProfileNavigationArrowIcon />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.profileNavigationItem} onPress={() => navigation.navigate("FAQ")} >
            <View style={styles.profileNavigationTextSide} >
                <Text style={styles.profileNavigationTitle} >Հաճախ տրվող հարցեր</Text>
            </View>           
            <ProfileNavigationArrowIcon/>
          </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.profileNavigationItem}
        onPress={() => navigation.navigate("Contactus")}
      >
        <View style={styles.profileNavigationTextSide}>
          <Text style={styles.profileNavigationTitle}>
            {lang[appContext.state.lang].more.contactUs}
          </Text>
        </View>
        <ProfileNavigationArrowIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    // flexDirection:"column",
    paddingHorizontal: "5%",
  },
  title: {
    fontSize: 18,
    paddingBottom: 8,
    marginTop: 44,
    color:"#000"
  },
  profileNavigationItem: {
    // flex:1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  profileNavigationTextSide: {
    flex: 1,
    flexDirection: "row",
  },
  profileNavigationTitle: {
    fontSize: 14,
    color:"#000"
  },
});
