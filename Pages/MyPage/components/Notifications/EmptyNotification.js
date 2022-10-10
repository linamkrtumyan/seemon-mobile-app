import { StyleSheet, Text, View } from "react-native";
import EmptyNotificationIcon from "../../../../assets/EmptyNotificationIcon";
import React from "react";


export default function EmptyNotification({ navigation, initialRoute }) {
  return (
    <View style={styles.container}>
      <EmptyNotificationIcon />
      <Text style={styles.text}>
        {/* {lang[`${appContext.state.lang}`].shoppingCartPage.emptyCartMessage} */}
      </Text>
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
    fontSize: 18,
    lineHeight: 22,
    marginTop: 45,
    color:"#000"
  },
});
