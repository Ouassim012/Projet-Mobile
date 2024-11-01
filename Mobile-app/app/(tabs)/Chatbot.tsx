import { Image, StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';  // Import the router

const Page = () => {
  const navigation = useNavigation();
  const router = useRouter();  // Initialize the router for navigation
console.log("chatbot is rendering")
  return (
    <View style={styles.container}>
      {/* Feather Icon for back navigation */}
      <TouchableOpacity style={styles.backButton}         onPress={() => router.back()}  // Navigate to login page
      >
        <Feather name="arrow-left" size={30} color="#000" />
      </TouchableOpacity>

      <Text style={styles.text}>Chatbot hnaya</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    position: 'absolute',
   top: Platform.OS === 'ios' ? 60 : 40, //  Adjust for iOS/Android differences
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
