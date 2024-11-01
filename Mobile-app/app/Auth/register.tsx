import {
  Image,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInputProps,
  TextInput,
  View,
  Modal,
  ImageBackground, // Import ImageBackground
} from 'react-native';
import React, { useState } from 'react';
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import { useRouter } from 'expo-router';

const Register: React.FC<TextInputProps> = ({ ...otherProps }) => {
  const router = useRouter();
  // States for managing password visibility
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // States for managing modal visibility and content
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // Function for handling registration
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setModalTitle("Erreur");
      setModalMessage("Les mots de passe ne correspondent pas");
      setModalVisible(true);
      return;
    }

    try {
      const response = await fetch('http://192.168.1.12:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 201) {
        setModalTitle("Succès");
        setModalMessage("Inscription réussie !");
        setModalVisible(true);
        // Wait for 2 seconds before navigating
        setTimeout(() => {
          router.push('/Auth/login'); // Navigate to the login screen
        }, 3000); // Adjust the time (in milliseconds) as needed
      } else {
        const errorData = await response.json();
        setModalTitle("Erreur d'inscription");
        setModalMessage(errorData.error || "Erreur inconnue");
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
      setModalTitle("Erreur d'inscription");
      setModalMessage("Erreur inconnue");
      setModalVisible(true);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/shab.jpg')} // Change to your background image path
      style={{ flex: 1 }} // Make it cover the whole screen
    >
      <SafeAreaView>
        <View style={{ padding: Spacing * 4, paddingTop: 42 }}>
          <View style={{ alignItems: "center", marginVertical: Spacing * 3, marginRight: 25 }}>
            <Text style={{
              fontSize: FontSize.xLarge,
              fontWeight: "800",
              color: Colors.primary,
              marginVertical: Spacing * 3,
            }}>
              Créer un compte
            </Text>
            <Text style={{
              fontSize: FontSize.small,
              maxWidth: "95%",
              textAlign: "center",
              color:"white",
              marginLeft:15
            }}>
              Créez un compte pour discuter avec notre IA et soulager votre stress instantanément
            </Text>
          </View>
          
          <View style={{ marginVertical: Spacing / 30 }}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={{
                width: '92%',
                height: '13%',
                fontSize: FontSize.small,
                padding: Spacing * 2,
                backgroundColor: Colors.lightPrimary,
                borderRadius: 15,
                borderWidth: 5,
                borderColor: Colors.active,
                marginBottom: 10,
              }}
              placeholderTextColor={Colors.darkText}
            />
            {/* Password input */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={showPassword}
                style={{
                  width: '92%',
                  height: '70%',
                  fontSize: FontSize.small,
                  padding: Spacing * 2,
                  backgroundColor: Colors.lightPrimary,
                  borderRadius: 15,
                  marginVertical: Spacing,
                  borderWidth: 5,
                  borderColor: Colors.active,
                }}
                placeholderTextColor={Colors.darkText}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ marginLeft: Spacing }}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"} // Toggle icon
                  size={Spacing * 2}
                  color={Colors.text}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                placeholder="Confirmer mot de passe"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={showConfirmPassword}
                style={{
                  marginBottom: 25,
                  width: '92%',
                  height: '63%',
                  fontSize: FontSize.small,
                  padding: Spacing * 2,
                  backgroundColor: Colors.lightPrimary,
                  borderRadius: 15,
                  marginVertical: Spacing,
                  borderWidth: 5,
                  borderColor: Colors.active,
                }}
                placeholderTextColor={Colors.darkText}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={{ marginLeft: Spacing }}>
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"} // Toggle icon
                  size={Spacing * 2}
                  color={Colors.text}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleRegister}
              style={{
                width: '50%',
                height: '9%',
                marginBottom: 25,
                padding: Spacing * 1,
                backgroundColor: Colors.active,
                marginHorizontal: Spacing * 7,
                marginTop: 10,
                borderRadius: 30,
                shadowColor: Colors.active,
                shadowOffset: {
                  width: 0,
                  height: Spacing,
                },
                shadowOpacity: 0.3,
                shadowRadius: Spacing,

              }}
            >
              <Text style={{
                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: 18,
                fontWeight: "800",
              }}>
                S'inscrire
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/Auth/login')}
              style={{
                padding: Spacing,
                marginRight: 15,
              }}
            >
              <Text
                style={{
                  color: Colors.active,
                  textAlign: "center",
                  fontSize: FontSize.small,
                }}
              >
                Vous avez déjà un compte ?
              </Text>
            </TouchableOpacity>
            <View
              style={{
                marginVertical: Spacing / 2,
                marginRight: 25,
              }}
            >
              <Text
                style={{
                  color: Colors.active,
                  textAlign: "center",
                  fontSize: FontSize.small,
                }}
              >
                Ou continuer avec
              </Text>

              <View
                style={{
                  marginTop: Spacing,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: Spacing,
                    backgroundColor: Colors.gray,
                    borderRadius: Spacing / 2,
                    marginHorizontal: Spacing,
                  }}
                >
                  <Ionicons
                    name="logo-google"
                    color={Colors.text}
                    size={Spacing * 2}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: Spacing,
                    backgroundColor: Colors.gray,
                    borderRadius: Spacing / 2,
                    marginHorizontal: Spacing,
                  }}
                >
                  <Ionicons
                    name="logo-apple"
                    color={Colors.text}
                    size={Spacing * 2}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: Spacing,
                    backgroundColor: Colors.gray,
                    borderRadius: Spacing / 2,
                    marginHorizontal: Spacing,
                  }}
                >
                  <Ionicons
                    name="logo-facebook"
                    color={Colors.text}
                    size={Spacing * 2}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Modal for registration messages */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <Text style={styles.modalMessage}>{modalMessage}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalMessage: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: Colors.active,
  },
  modalButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default Register;
