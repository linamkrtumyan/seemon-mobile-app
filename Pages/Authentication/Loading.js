import { StyleSheet, View, ActivityIndicator } from "react-native";
import React from "react"

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#F04A38" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
