import { Image, StyleSheet, Text,View,Platform } from 'react-native';
import React from 'react'


const Page = () =>{
  return (
    <View style={styles.container}>
      <Text>profil</Text>
    </View>
      )
}
export default Page;
  


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});
