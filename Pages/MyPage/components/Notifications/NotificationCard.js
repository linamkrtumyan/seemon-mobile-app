import { StyleSheet, Text, View } from "react-native";
import React from "react";



export default function NotificationCard({ navigation, initialRoute ,item}) {
  return (
    <View style={styles.notificationItem} >
     <Text style={{color:"#000"}} >{item.note}</Text>
     <Text style={styles.dateText} >{item.created_on_utc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    notificationItem:{
        borderBottomWidth:1,
        borderColor:"#E2E2E2",
        paddingVertical:24,
        fontSize:14
    },
    dateText: {
        color:"#8F8F8F",
        marginTop:8,
        fontSize:12,
    }

});
