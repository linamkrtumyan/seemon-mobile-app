import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BigShoppingCart from "../../../assets/BigShoppingCart";
import lang from "../../../lang.json";
import { AuthContext } from "../../../App";

export default function EmptyShoppingCart() {
  const appContext = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <BigShoppingCart />
      <Text style={styles.text}>
        {lang[`${appContext.state.lang}`].shoppingCartPage.emptyCartMessage}
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
