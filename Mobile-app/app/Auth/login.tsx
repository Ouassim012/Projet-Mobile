import { Image, StyleSheet, Text,TouchableOpacity,View,Platform } from 'react-native';
import React from 'react'


const Page = () =>{

  return (
    <View style={styles.container}>
      <Text>hada login page</Text>
      
    </View>
      )
}
export default Page;
  

// in your page file (e.g., welcome.tsx)

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});
