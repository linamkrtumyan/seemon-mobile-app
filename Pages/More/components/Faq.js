import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ArrowDownIcon from "../../../assets/ArrowDownIcon";
import ArrowUpIcon from "../../../assets/ArrowUpIcon";

export default function Faq() {
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShow1, setShouldShow1] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={() => setShouldShow(!shouldShow)}
      >
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Ի՞նչ արժե առաքման ծառայությունը</Text>
          {shouldShow ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </View>
        {shouldShow ? (
          <Text style={styles.subtitle}>
            Ծանուցումներ զեղչերի, պրոմո կոդերի և հատուկ գների մասին
          </Text>
        ) : null}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.titleContainer}
        onPress={() => setShouldShow1(!shouldShow1)}
      >
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Հարց 2</Text>
          {shouldShow1 ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </View>
        {shouldShow1 ? (
          <Text style={styles.subtitle}>
            Ծանուցումներ զեղչերի, պրոմո կոդերի և հատուկ գների մասին
          </Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: "5%",
    marginTop: 22,
  },
  titleContainer: {
    paddingVertical: 26,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  item: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    marginTop: 16,
    color: "#8F8F8F",
    fontSize: 14,
  },
});
