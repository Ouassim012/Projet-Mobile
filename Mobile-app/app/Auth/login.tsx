import {
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInputProps,
  TextInput,
  View,
  ImageBackground
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

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const Page: React.FC<TextInputProps> = ({ ...otherProps }) => {
  const router = useRouter();

  // States for managing modal visibility and content
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  // Function for handling login
  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      setModalTitle('Erreur');
      setModalMessage('Veuillez remplir tous les champs');
      setModalVisible(true);
      return;
    }

    try {
      const response = await fetch('http://192.168.1.12:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setModalTitle('Succès');
        setModalMessage('Connexion réussie !');
        setModalVisible(true);
       // Wait for 2 seconds before navigating
      setTimeout(() => {
        router.push('/(tabs)');
      }, 2000); // Adjust the time (in milliseconds) as needed
    } else {
        const errorData = await response.json();
        setModalTitle('Erreur');
        setModalMessage(errorData.message || 'Connexion échouée. Vérifiez vos informations.');
        setModalVisible(true);
      }
    } catch (error) {
      setModalTitle('Erreur');
      setModalMessage('Une erreur est survenue lors de la connexion');
      setModalVisible(true);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/shab.jpg')} // Change to your background image path
      style={{ flex: 1 }} // Make it cover the whole screen
    >
    <SafeAreaView>
      <View style={{ padding: Spacing * 4 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{
            fontSize: FontSize.xLarge,
            color: Colors.primary,
            marginTop: 100,
            fontWeight: "800",
            marginVertical: Spacing * 2,
            marginRight:14

          }}>
            Se connecter ici
          </Text>
          <Text style={{
            fontSize: 14,
            maxWidth: "98%",
            textAlign: "center",
            marginRight:10,
            color:"white"

          }}>
            Bienvenue, prenez une grande inspiration. Nous sommes là pour vous aider à retrouver votre sérénité!
          </Text>
        </View>

        <View style={{ marginTop: Spacing * 3 }}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{
              width: '92%',
              height: '14%',
              fontSize: FontSize.small,
              padding: Spacing * 2,
              backgroundColor: Colors.lightPrimary,
              borderRadius: 15,
              borderWidth: 5,
              borderColor: Colors.active,
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
          <View style={{ marginBottom: Spacing * 2, marginTop: Spacing }}>
            <Text style={{
              fontSize: FontSize.small,
              color: Colors.primary,
              alignSelf: "flex-end",
            }}>
              Mot de passe oublié ?
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => handleLogin(email, password)}
            style={{
              width: '50%',
              height: '10%',
              padding: Spacing * 1,
              backgroundColor: Colors.active,
              marginHorizontal: Spacing * 6,
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
              Se connecter
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/Auth/register')}
            style={{
              padding: Spacing,
              marginRight: 40
            }}
          >
            <Text style={{
              color: Colors.active,
              textAlign: "center",
              fontSize: FontSize.small,
              marginLeft:10

            }}>
              Créer un nouveau compte
            </Text>
          </TouchableOpacity>
          <View style={{
            marginVertical: Spacing * 3,
            marginRight: 40
          }}>
            <Text style={{
              color: Colors.active,
              textAlign: "center",
              fontSize: FontSize.small,
            }}>
              Ou continuer avec
            </Text>

            <View style={{
              marginTop: Spacing,
              flexDirection: "row",
              justifyContent: "center",
            }}>
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

        {/* Modal for alerts */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={[styles.modalTitle, { color: Colors.active }]}>{modalTitle}</Text>
              <Text style={[styles.modalMessage, { color: Colors.text }]}>{modalMessage}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
    </ImageBackground>
  );
}

export default Page;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    padding: Spacing * 2,
    backgroundColor: Colors.lightPrimary,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: FontSize.large,
    fontWeight: "bold",
    marginBottom: Spacing,
  },
  modalMessage: {
    fontSize: FontSize.medium,
    marginBottom: Spacing,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: Colors.active,
    borderRadius: 5,
    padding: Spacing,
    marginTop: Spacing,
  },
  modalButtonText: {
    color: Colors.onPrimary,
    fontWeight: "bold",
  },
}); 