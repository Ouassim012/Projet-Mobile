import { Image, StyleSheet, Text,TouchableOpacity,View,Platform, Pressable } from 'react-native';
import React from 'react'
import { icon } from '@/app/constants/icon';


const TabBarButton = ({onPress,onLongPress,isFocused,routeName,color,label}:{onPress:Function;onLongPress:Function;isFocused:boolean;routeName:string;color:string;label:string}) =>{
  return (
    <Pressable
    
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      {icon[routeName]({
        color:isFocused?'#673ab7':'#222'
      })}
      <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
        {label}
      </Text>
    </Pressable>
      )
}
export default TabBarButton;
  


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  tabbarItem:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    gap:5
    }
});
