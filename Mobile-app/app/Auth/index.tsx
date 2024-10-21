import { Image, StyleSheet, Text,TouchableOpacity,View,Platform } from 'react-native';
import React from 'react'
import { useRouter } from 'expo-router';  // Import the router


const Pagea = () =>{
    const router = useRouter();  // Initialize the router for navigation

  return (
    <View style={styles.container} >
      <Text>hada welcome page</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/Auth/login')}  // Navigate to login page
      >
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>

    </View>
      )
}
export default Pagea;
  


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#2dabeb',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
    },
  });
