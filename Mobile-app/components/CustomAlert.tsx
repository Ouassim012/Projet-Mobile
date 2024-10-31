// CustomAlert.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomAlert : React.FC<any> = ({ visible, title, message, onClose, backgroundColor, titleColor, messageColor }) => {
  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.overlay}>
        <View style={[styles.alertBox, { backgroundColor: backgroundColor || 'white' }]}>
          <Text style={[styles.title, { color: titleColor || 'black' }]}>{title}</Text>
          <Text style={[styles.message, { color: messageColor || 'black' }]}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  alertBox: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF', // Default button color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Button text color
    fontWeight: 'bold',
  },
});

export default CustomAlert;
