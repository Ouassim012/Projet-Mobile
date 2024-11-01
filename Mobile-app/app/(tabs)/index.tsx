import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useHeaderHeight } from '@react-navigation/elements';
import CategoryButtons from '@/components/CategoryButtons';
import Listings from '@/components/Listings';
import listingData from '../constants/destinations.json';
import { BlurView } from 'expo-blur'; // Make sure to install expo-blur

const Page = () => {
  const headerheight = useHeaderHeight();
  const [category, setCategory] = useState('Tous');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onCatChanged = (category: React.SetStateAction<string>) => {
    console.log("Category:", category);
    setCategory(category);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}} style={{ marginLeft: 20 }}>
              <Image
                source={require('../../assets/images/user.jpg')}
                style={{ width: 40, height: 40, borderRadius: 10 }}
                onError={() => console.log("Failed to load image")}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {}} style={styles.notificationButton}>
              <Ionicons name='notifications' size={20} color={Colors.black} />
            </TouchableOpacity>
          )
        }}
      />
      <View style={[styles.container, { paddingTop: headerheight }]}>
        <Text style={styles.headingTxt}>Explorez la beauté des sons relaxants</Text>
        <View style={styles.searchSectionWrapper}>
          <View style={styles.searchBar}>
            <Ionicons name='search' size={20} style={styles.searchIcon} color={Colors.black} />
            <TextInput placeholder='Search...' />
          </View>
          <TouchableOpacity onPress={toggleModal} style={styles.filterBtn}>
            <Ionicons name='options' size={30} color={"white"} />
          </TouchableOpacity>
        </View>

        <CategoryButtons onCategoryChanged={onCatChanged} />
        <Listings listings={listingData} category={category} />

        {/* Modal with Blur Background */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="fade"
          onRequestClose={toggleModal}
        >
          <BlurView intensity={50} tint="dark" style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Filtrage des options</Text>
              <View style={{height:100}}><CategoryButtons onCategoryChanged={onCatChanged} /></View>
              

              <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgcolor,
  },
  headingTxt: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.black,
    marginTop: 10,
  },
  searchSectionWrapper: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
  },
  searchIcon: {
    marginTop: 3,
    marginRight: 5,
  },
  filterBtn: {
    backgroundColor: "#2dabeb",
    padding: 12,
    borderRadius: 10,
    marginLeft: 20,
  },
  notificationButton: {
    marginRight: 20,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2dabeb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
