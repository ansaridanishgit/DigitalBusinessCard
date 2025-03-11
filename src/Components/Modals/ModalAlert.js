import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

const ModalAlert = ({ visible, onClose, title }) => {
  return (
    <Modal
      transparent={true}
      animationType='slide'
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{title}</Text>
          <Pressable style={[styles.closeButton, { backgroundColor: '#56acff' }]} 
            onPress={onClose}>
            <Text style={styles.closeButtonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  },
  modalContainer: {
    width: '80%', 
    padding: 25,  
    backgroundColor: '#fff',
    borderRadius: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 10,  
    alignItems: 'center',
  },
  modalText: {
    fontSize: 19,  
    fontWeight: 'bold', 
    color: '#5b5b5b', 
    marginBottom: 30,
    textAlign: 'center',
  },
  closeButton: {
    width: 100, 
    paddingVertical: 10,
    borderRadius: 8, 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,  
    fontWeight: '600',
  },
});
export default ModalAlert;