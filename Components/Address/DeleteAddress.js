import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import RemoveProductIcon from "../../assets/RemoveProductIcon";
import request from "../../request";
import RedTrashIcon from "../../assets/RedTrashIcon";
import { useToast } from "react-native-toast-notifications";

export default function DeleteAddress({
  id,
  addressCount,
  setAddressCount,
  customer = false,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useToast();

  const deleteAddress = () => {
    if (customer) {
      request(`/api-frontend/Customer/AddressDelete/${id}`, "DELETE")
        .then(({data, headerData}) => {
          if (data.success) {
            setAddressCount(addressCount - 1);
            toast.show(data.message)
          }else {
            toast.show(data.message)

          }
        })
        .catch((e) => {
          console.log(e, "error");
        });
    } else {
      request(`/api-frontend/Checkout/DeleteEditAddress/${id}?opc=false`, "DELETE")
        .then(({data, headerData}) => {
          if (data.success) {
            setAddressCount(addressCount - 1);
            toast.show(data.message);
          } else {
            toast.show(data.message);
          }
        })
        .catch((e) => {
          console.log(e, "error");
          toast.show("Something bad heppened");
        });
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <RedTrashIcon />

            <Text style={styles.deleteMessage}>
              Վստա՞հ եք, որ ցանկանում եք ջնջել այս հասցեն
            </Text>

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Չեղարկել</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonSubmit]}
              onPress={() => {
                setModalVisible(!modalVisible);
                deleteAddress();
              }}
            >
              <Text style={styles.textSubmit}>Ջնջել</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <RemoveProductIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "95%",
    paddingVertical: 49,
  },
  button: {
    // borderRadius: 20,
    // padding: 10,
    // elevation: 2
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#F04A38",
    padding: 12,
    width: "90%",
    borderRadius: 8,
    marginTop: 36,
    marginBottom: 16,
  },
  buttonSubmit: {
    // backgroundColor: "#F04A38",
    padding: 10,
    width: "90%",
    borderRadius: 8,
    borderColor: "#8F8F8F",
    borderWidth: 1,

    // marginBottom:
  },
  textSubmit: {
    color: "#8F8F8F",
    textAlign: "center",
  },
  textStyle: {
    color: "white",
    // fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  deleteMessage: {
    marginTop: 20,
  },
});
