import { Tabs } from 'expo-router';
import React from 'react';
import {View,Text} from 'react-native';
import {TabBar} from '@/components/TabBar';
import { Stack } from 'expo-router';


export default function TabLayout() {

  return (
    <Stack>
    <Stack.Screen name="welcome" options={{ headerShown: false }} />

  </Stack>
  )
}
