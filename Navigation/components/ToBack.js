import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import Arrow from "../../assets/Arrow";
import React from "react"

export default function ToBack() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      hitSlop={{ top: 20, bottom: 20, left: 30, right: 20 }}
      style={styles.item}
      onPress={() => navigation.goBack()}
    >
      <Arrow />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    marginLeft: "12%",
  },
});
