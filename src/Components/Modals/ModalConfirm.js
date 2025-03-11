import React, { useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import Loadercomponent from '../Loader'
import { deleteDoc, doc } from 'firebase/firestore';
import { FIREBASE_DB } from '@/FirebaseConfig';

const ModalConfirm = ({ visible, onClose,fetchData ,taskId}) => {
  const [Loader, setLoader] = useState(false);

   // Delete a task
      const handleDelete = async (taskId) => {
          try {
              setLoader(true);
              await deleteDoc(doc(FIREBASE_DB, "Tasks", taskId));
              fetchData();
          } catch (error) {
              Alert.alert("Error", "Failed to delete the task. Please try again.");
          } finally {
              setLoader(false);
              onClose()
          }
      };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Delete this task</Text>
          <Text style={styles.modalText}>Are you sure you want to delete?</Text>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.confirmButton} onPress={()=>handleDelete(taskId)}>
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Loadercomponent Loader={Loader} />
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#56acff',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  txnMode: {
    fontWeight: 'bold',
    color: '#69ae44',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    width: '45%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  confirmButton: {
    width: '45%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#56acff',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default ModalConfirm;