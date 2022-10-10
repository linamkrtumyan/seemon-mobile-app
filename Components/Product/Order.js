import { StyleSheet, View, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { RadioButton } from "react-native-paper";
import OrderIcon from "../../assets/OrderIcon";

export default function Order({ setOrderBy, orderBy }) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(false);
  }, [orderBy]);

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.centeredView}
        >
          <TouchableOpacity style={styles.modalView}>
            <RadioButton.Group
              onValueChange={(value) => setOrderBy(value)}
              value={orderBy}
            >
              <RadioButton.Item
                color="#F04A38"
                uncheckedColor="#F04A38"
                mode="android"
                label="Այբենական Ա-ֆ"
                value="NameAsc"
                style={styles.radioItem}
                labelStyle={{ fontSize: 14 }}
              />
              <RadioButton.Item
                color="#F04A38"
                uncheckedColor="#F04A38"
                mode="android"
                label="Այբենական Ֆ-Ա"
                value="NameDesc"
                style={styles.radioItem}
                labelStyle={{ fontSize: 14 }}
              />
              <RadioButton.Item
                color="#F04A38"
                uncheckedColor="#F04A38"
                mode="android"
                label="Գինը ցածրից բարձր"
                value="PriceAsc"
                style={styles.radioItem}
                labelStyle={{ fontSize: 14 }}
              />
              <RadioButton.Item
                color="#F04A38"
                uncheckedColor="#F04A38"
                mode="android"
                label="Գինը բարձրից ցածր"
                value="PriceDesc"
                style={styles.radioItem}
                labelStyle={{ fontSize: 14 }}
              />
            </RadioButton.Group>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => setModalVisible(true)}
      >
        <OrderIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },

  modalView: {
    position: "absolute",
    right: 0,
    marginTop: 142,
    width: 250,
    height: 226,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    borderColor: "#A5DACF",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  orderContainer: {
    borderWidth: 1,
    borderColor: "#A5DACF",
    borderRadius: 6,
    shadowColor: "#dedede",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    backgroundColor: "white",
    opacity: 1,
  },
  radioItem: {
    flexDirection: "row-reverse",
    alignSelf: "flex-start",
  },
});
