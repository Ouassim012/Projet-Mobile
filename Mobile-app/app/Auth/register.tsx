import { Image, StyleSheet, Text,TouchableOpacity,View,Platform } from 'react-native';
import React from 'react'


const register = () =>{

  return (
    <View style={styles.container}>
      <Text>hada register page</Text>
      
    </View>
      )
}
export default register;
  

// in your page file (e.g., welcome.tsx)

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});
