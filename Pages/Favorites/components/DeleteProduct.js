import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import React, { useState } from "react";
import request from "../../../request";
import { AuthContext } from "../../../App";
import SwipeTrashIcon from "../../../assets/SwipeTrashIcon";
import RedTrashIcon from "../../../assets/RedTrashIcon";

export default function DeleteProduct({
  id,
  setDeletedItemId,
}) {

  const cartItemCount = React.useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const deleteProductFromCart = () => {
    request("/api-frontend/Wishlist/UpdateWishlist", "POST", {
      removefromcart: id,
    })
      .then(({data, headerData}) => {
        if(data.success) {
        setDeletedItemId(id);
        }
        
      })
      .catch((e) => {
        console.log(e, "remove from wishlist error");
      });
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
    justifyContent: "center",
    height: "100%",
    // width:"100%"
  },
  modalView: {
    margin: "5%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent:"center",
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
  buttonClose: {
    backgroundColor: "#F04A38",
    padding: 12,
    width: "90%",
    borderRadius: 8,
    marginTop: 36,
    marginBottom: 16,
  },
  buttonSubmit: {
    padding: 10,
    width: "90%",
    borderRadius: 8,
    borderColor: "#8F8F8F",
    borderWidth: 1,
  },
  textSubmit: {
    color: "#8F8F8F",
    textAlign: "center",
  },
  textStyle: {
    color: "white",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  deleteMessage: {
    marginTop: 20,
    width:"60%",
    textAlign:"center",
    color:"#000"

  },
  container: {
    flexDirection: "row",
    height: "100%",
    backgroundColor: "#B70202",
    width: 82,
  },

  deleteText: {
    color: "#fff",
    fontSize: 16,
  },
});
