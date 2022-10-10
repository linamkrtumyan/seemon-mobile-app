import { StyleSheet, View } from "react-native";
import React from "react";
import { AuthContext } from "../../../App";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Languages() {
  const loacalization = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <RadioButton.Group
        onValueChange={(value) => {
          loacalization.authContext.setLanguage(value);
          AsyncStorage.setItem("language", value);
          // NativeModules.DevSettings.reload();
        }}
        value={loacalization.state.lang}
      >
        <RadioButton.Item
          color="#F04A38"
          uncheckedColor="#F04A38"
          mode="android"
          label="Հայերեն"
          value="arm"
          style={styles.radioItem}
          labelStyle={{ fontSize: 14 }}
        />
        <RadioButton.Item
          color="#F04A38"
          uncheckedColor="#F04A38"
          mode="android"
          label="Русский"
          value="ru"
          style={styles.radioItem}
          labelStyle={{ fontSize: 14 }}
        />
        <RadioButton.Item
          color="#F04A38"
          uncheckedColor="#F04A38"
          mode="android"
          label="English"
          value="eng"
          style={styles.radioItem}
          labelStyle={{ fontSize: 14 }}
        />
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: "5%",
    marginTop: 22,
  },
  radioItem: {
    flexDirection: "row-reverse",
    alignSelf: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
    paddingVertical: 20,
  },
});
