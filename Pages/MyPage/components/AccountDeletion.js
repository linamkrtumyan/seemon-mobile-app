import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import request from '../../../request';
import {AuthContext} from '../../../App';

export default function AccountDeletion() {
  const appContext = React.useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const deleteAccount = () => {
    request('/api-frontend/Authenticate/DeleteCustomerAccount')
      .then(({data, headerData}) => {
        if (data.Success) {
          setModalVisible(false);
          appContext.authContext.signOut();
        }
      })
      .catch(e => {
        console.log(e, 'DeleteCustomerAccount error');
      });
  };
  return (
    <>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to delete your account?!
              </Text>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={deleteAccount}
                style={styles.submitBtn}>
                <Text style={styles.submitText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Delete account</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flex: 1,
    left: 0,
    width: '100%',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: '#000',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
  deleteBtn: {
    width: '100%',
  },
  cancelText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 40,
  },
  submitBtn: {
    borderColor: '#8F8F8F',
    borderWidth: 1,
    width: 300,
    borderRadius: 8,
    height: 44,
    marginTop: 16,
  },
  submitText: {
    color: '#8F8F8F',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 40,
  },
  cancelBtn: {
    backgroundColor: '#F04A38',
    width: 300,
    color: '#fff',
    textAlign: 'center',
    height: 44,
    borderRadius: 8,
    marginTop: 34,
  },
});
