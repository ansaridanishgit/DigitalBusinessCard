import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';

const Loader = ({ Loader }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={Loader} 
    >
      <View style={styles.loaderview}>
        <ActivityIndicator size={40} color="#fff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loaderview: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
