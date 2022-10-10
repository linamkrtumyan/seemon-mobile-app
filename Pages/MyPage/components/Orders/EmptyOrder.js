import { StyleSheet, Text, View, SafeAreaView, ScrollView,TouchableOpacity } from "react-native";
import React from "react";

// import EmptyOrdersIcon from "../../../../assets/EmptyOrdersIcon";


export default function EmptyOrder({ navigation, initialRoute }) {


  
  return (
    <View style={styles.container}>
    {/* <EmptyOrdersIcon /> */}
    <Text style={styles.text}>
      {/* {lang[`${appContext.state.lang}`].shoppingCartPage.emptyCartMessage} */}
      Դուք դեռևս չունեք պատվեր
      
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
      },
});
