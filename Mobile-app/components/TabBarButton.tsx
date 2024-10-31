import { Image, StyleSheet, Text,TouchableOpacity,View,Platform, Pressable, GestureResponderEvent } from 'react-native';
import React, { useEffect } from 'react'
import { icon } from '@/app/constants/icon';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const springConfig = {
  stiffness: 50, // Default is usually higher (like 100), reduce for less bounce
  damping: 10,    // Default is usually lower (like 20), increase for less bounce
  mass: 1,        // Default is usually 1, can adjust to change responsiveness
};
const TabBarButton = ({onPress,onLongPress,isFocused,routeName,color,label}:{onPress:(event: GestureResponderEvent) => void;onLongPress:(event: GestureResponderEvent) => void;isFocused:boolean;routeName:string;color:string;label:string}) =>{
  const scale = useSharedValue(0)
  useEffect(()=>{
    scale.value = withSpring(typeof isFocused === 'boolean'? (isFocused ? 1:0):isFocused, {duration:350});
  },[scale,isFocused])

  const animatedTextstyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value,[0,1],[1,0])
    return {opacity}
  });
  const animatedIconStyle =useAnimatedStyle(() =>{
const scaleValue = interpolate(scale.value,[0,1],[1,1.2]);
const top = interpolate(scale.value, [0,1],[0,9]);
return {transform:[{
  scale:scaleValue
}],
top:top}
  });


  
  return (
    <Pressable
    
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    ><Animated.View style={animatedIconStyle}>{icon[routeName]({
        color:isFocused?'#fff':'#222',
      })}</Animated.View>
      
    <Animated.Text style={[{ color: isFocused ? '#fff' : '#222' },animatedTextstyle]}>
        {label}
      </Animated.Text>
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

