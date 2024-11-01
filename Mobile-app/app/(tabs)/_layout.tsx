import { Tabs } from 'expo-router';
import React from 'react';
import {View,Text} from 'react-native';
import {TabBar} from '@/components/TabBar';


export default function TabLayout() {
  console.log('tab page is rendering');  // This will log every render

  return (
             <Tabs tabBar={props => <TabBar  {...props}  />} >
              <Tabs.Screen name='index' options={{title:'Home',headerTitle:""}}></Tabs.Screen>
              <Tabs.Screen name='Chatbot' options={{title:'Chatbot' // Unmount the screen when it's not focused
 // Hides the tab bar on this screen
}}></Tabs.Screen>
              <Tabs.Screen name='Profile' options={{title:'Profile'}}></Tabs.Screen>

             </Tabs>
  )
}
