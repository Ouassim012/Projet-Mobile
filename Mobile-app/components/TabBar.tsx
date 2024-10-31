import { View, Text, TouchableOpacity, StyleSheet, LayoutChangeEvent } from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons';
import TabBarButton from './TabBarButton';
import { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import React from 'react';
import { useFocusEffect } from 'expo-router';
export function TabBar({ state, descriptors, navigation }:BottomTabBarProps) {
  const [dimensions,setdimension]=useState({height:20,width:100})
  const buttonwidth= dimensions.width/state.routes.length

  const onTabbarLayout=(e:LayoutChangeEvent)=>{
    setdimension({
      height:e.nativeEvent.layout.height,
      width:e.nativeEvent.layout.width,

    });
  };
  const tabPositionx=useSharedValue(0);
  const animatedStyle= useAnimatedStyle(() => {
    return {
      transform:[{translateX:tabPositionx.value}]
    };
  });
  const isChatbotFocused = state.routes[state.index].name === 'Chatbot';
  const tabOpacity = useSharedValue(1); // New shared value for opacity
  const tabBarAnimatedStyle = useAnimatedStyle(() => ({
    opacity: tabOpacity.value,
  }));
  useFocusEffect(
    React.useCallback(() => {
      if (isChatbotFocused) {
        // Animate opacity to 0 over 300ms
        tabOpacity.value = withTiming(0, { duration: 300 }, () => {
          tabPositionx.value = 0; // Reset position if needed
        });
      } else {
        // Reset opacity back to 1 when not focused
        tabOpacity.value = withTiming(1, { duration: 500 });
        tabPositionx.value = withSpring(buttonwidth * state.index); // Move tab position when refocusing
      }
    }, [state.index, isChatbotFocused])
  );

  
  return (
    <Animated.View onLayout={onTabbarLayout} style={[styles.tabbar, tabBarAnimatedStyle]}>
      <Animated.View style={[animatedStyle,{
        position:"absolute",
        backgroundColor:"#2dabeb",
        borderRadius:26,
        marginHorizontal:12,
        height:dimensions.height-20,
        width:buttonwidth-22
      }]}/>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const springConfig = {
          stiffness: 50, // Default is usually higher (like 100), reduce for less bounce
          damping: 10,    // Default is usually lower (like 20), increase for less bounce
          mass: 1,        // Default is usually 1, can adjust to change responsiveness
          
        };
        const onPress = () => {
          tabPositionx.value=withSpring(buttonwidth*index,{duration:1500})

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
          key={route.name}
          onPress={onPress}
          onLongPress={onLongPress}
          isFocused={isFocused}
          routeName={route.name}
          color={isFocused?'#fff':'#222'}
          label={label}/>
          /*
          <TouchableOpacity
          key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {icon[route.name]({
              color:isFocused?'#673ab7':'#222'
            })}
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>*/
        );
      })}
    </Animated.View>
  );
}
const styles = StyleSheet.create({
tabbar:{
  position:"absolute",
  bottom:20,
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  backgroundColor:'#fff',
  marginHorizontal:80,
paddingVertical:12,
borderRadius:35,
shadowColor: '#000', // Shadow color
shadowOffset: {
  width: 0, // Horizontal offset
  height: 10, // Vertical offset
},
shadowOpacity: 0.25, // Opacity of the shadow
shadowRadius: 20, // Blur radius of the shadow
elevation: 10, // For Android (optional)

},
tabbarItem:{
flex:1,
justifyContent:'center',
alignItems:'center',
gap:5
}
})
