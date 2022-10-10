import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import React, {useState} from "react";
import request from "../../../request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../../App";
import SwipeTrashIcon from "../../../assets/SwipeTrashIcon";
import RedTrashIcon from "../../../assets/RedTrashIcon";
import { useToast } from "react-native-toast-notifications";


export default function DeleteProduct({ cartItemId }) {
  const cartItemCount = React.useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useToast();


  const deleteProductFromCart = () => {
    request(
      `/api-frontend/ShoppingCart/RemoveProductFromCartById/${cartItemId}`,
      "DELETE"
    )
      .then(({data, headerData}) => {

        if (data.success) {
          AsyncStorage.setItem("cartItemCount", String(data.total_products));
          cartItemCount.authContext.setCartItemCount(data.total_products);
          toast.show(data.message)
        }else {
          toast.show(data.message)
        }
      })
      .catch((e) => {});
  };
  return (
    <>
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
                Վստա՞հ եք, որ ցանկանում եք ջնջել այս ապրանքը
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
                  deleteProductFromCart();
                }}
              >
                <Text style={styles.textSubmit}>Ջնջել</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.container}
        >
          <View
            style={{
              width: 82,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SwipeTrashIcon />
          </View>
        </TouchableOpacity>
      </View>


     
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    height: "100%",
  },
  modalView: {
    margin: "5%",
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 85,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
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
    color:"#000"
  },
  container: {
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B70202",
  },

  deleteText: {
    color: "#fff",
    fontSize: 16,
  },
});
