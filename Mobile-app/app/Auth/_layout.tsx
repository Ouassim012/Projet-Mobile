import { Tabs } from 'expo-router';
import React from 'react';
import {View,Text} from 'react-native';
import {TabBar} from '@/components/TabBar';
import { Stack } from 'expo-router';


export default function AuthLayout() {
  console.log('layoutauth page is rendering');  // This will log every render

  return (
    <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="welcome" />  
    <Stack.Screen name="login" />    
  </Stack>
  )
}
