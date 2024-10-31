import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, ImageBackground, SafeAreaView, Keyboard, TouchableWithoutFeedback, Animated, Linking, Platform , ActivityIndicator} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Allan_400Regular, Allan_700Bold } from '@expo-google-fonts/allan';
import { useRouter } from 'expo-router';  // Import the router
import * as Speech from 'expo-speech'; // Import pour la synthèse vocale
import AppLoading from 'expo-app-loading';

const GEMINI_API_KEY ='AIzaSyABbBjgCei_VhYroKuU9-eiBgIOxzrifaI';


type Message = {
  text: string;
  sender: "user" | "gemini";
};

const Page = () => {
  const [msg, setMsg] = useState<string>(""); 
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isFocused, setIsFocused] = useState(false); 
  const [isTyping, setIsTyping] = useState(false); 
  const [showCards, setShowCards] = useState(true); 
  const [isSpeaking, setIsSpeaking] = useState(false); // État pour gérer la lecture
  const navigation = useNavigation();
  const router = useRouter();  // Initialize the router for navigation



  // Animation des points de saisie
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;
 

  

  useEffect(() => {
    if (isTyping) {
      const animateDots = (dot, delay) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(dot, { toValue: -2, duration: 300, delay: delay, useNativeDriver: true }),
            Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
            Animated.timing(dot, { toValue: 2, duration: 300, useNativeDriver: true }),
            Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
          ])
        ).start();
      };
      animateDots(dot1, 0);
      animateDots(dot2, 100);
      animateDots(dot3, 200);
    }
  }, [isTyping, dot1, dot2, dot3]);

  const handleButtonClick = async () => {
    if (!msg.trim()) return;

    const userMessage: Message = { text: msg, sender: 'user' };
    setMessages((prevMessages) => [userMessage, ...prevMessages]);
    setMsg(""); 
    setShowCards(false); 

    setIsTyping(true);

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: msg,
                },
              ],
            },
          ],
        }),
      });
      const data = await response.json();
      let reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      reply = reply.replace(/\*/g, ""); 
      const geminiMessage: Message = { text: reply, sender: 'gemini' };
      setMessages((prevMessages) => [geminiMessage, ...prevMessages]);

      // Ajoutez la fonction de synthèse vocale
      if (isSpeaking) {
        Speech.speak(reply); // Lire la réponse de Gemini
      }

    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      Speech.stop(); // Arrêter la synthèse vocale
    } else {
      const lastMessage = messages.find(msg => msg.sender === 'gemini');
      if (lastMessage) {
        Speech.speak(lastMessage.text); // Lire le dernier message de Gemini
      }
    }
    setIsSpeaking(!isSpeaking); // Inverser l'état de lecture
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.geminiMessage]}>
            <Text style={item.sender === 'user' ? styles.messagetextUser : styles.messagetextGimii}>
              {item.text}
              {item.sender === 'gemini' && ( // Affiche le bouton uniquement pour les messages de Gemini
                <TouchableOpacity style={styles.Playbutton} onPress={() => toggleSpeech(item.text)}>
                  <FontAwesome name={isSpeaking ? "stop" : "play"} size={20} color={'#2dabeb'} />
                </TouchableOpacity>
              )}
            </Text>
          </View>
  );
 
  const HeaderTitle = () => (
    <Text style={styles.headerTitle}> ChatBot   </Text>
  );

    // useEffect pour définir les options de navigation
    useEffect(() => {
      navigation.setOptions({
        headerTitle: () => <HeaderTitle />, // Définir le titre de l'en-tête
      });
    }, [navigation]);
  
  
  

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setIsFocused(false); }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ImageBackground
          source={showCards ? require('../../assets/images/Welcome_background.png') : require('../../assets/images/background_whatsap.jpg')}
          style={styles.background}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}  // Navigate to login page
          >
            <Feather name="arrow-left" size={30} color="#000" marginTop={3} />
          </TouchableOpacity>
        
          <SafeAreaView style={styles.container}>
            {messages.length === 0 && showCards && (
              <View style={styles.WelcomeContainer}>
                <Image source={require('../../assets/images/Chat_background.png')} style={styles.headerImage} />
                <View style={styles.cardContainer}>
                  {/* Première carte */}
                  <TouchableOpacity style={[styles.card, { backgroundColor: '#fff' }]} onPress={() => Linking.openURL('https://www.plusmagazine.be/fr/sante/6-techniques-pour-se-detendre-en-quelques-minutes/')}>
                    <Image source={require('../../assets/images/sérénité.png')} style={styles.cardImage} />
                    <Text style={styles.cardText}>Transformer le stress en sérénité</Text>
                  </TouchableOpacity>
  
                  {/* Deuxième carte */}
                  <TouchableOpacity style={styles.card} onPress={() => Linking.openURL('https://conseilsport.decathlon.fr/comment-debuter-la-meditation')}>
                    <Image source={require('../../assets/images/meditation.png')} style={styles.cardImage} />
                    <Text style={styles.cardText}>Méditation guidée pour débutants</Text>
                  </TouchableOpacity>
  
                  {/* Troisième carte */}
                  <TouchableOpacity style={[styles.card, { backgroundColor: '#E2F4FC' }]} onPress={() => Linking.openURL('https://www.apa.org/topics/stress/tips')}>
                    <Image source={require('../../assets/images/routine.jpg')} style={styles.cardImage} />
                    <Text style={styles.cardText}>Construire une routine anti-stress</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
  
            <FlatList
              data={messages}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.MessageContainer}
              inverted
              ListHeaderComponent={isTyping ? (
                <View style={styles.typingIndicatorContainer}>
                  <View style={styles.typingBubble}>
                    <Animated.Text style={[styles.typingDots, { transform: [{ translateY: dot1 }] }]}>•</Animated.Text>
                    <Animated.Text style={[styles.typingDots, { transform: [{ translateY: dot2 }] }]}>•</Animated.Text>
                    <Animated.Text style={[styles.typingDots, { transform: [{ translateY: dot3 }] }]}>•</Animated.Text>
                  </View>
                </View>
              ) : null}
            />
  
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="Comment puis-je vous aider ...."
                value={msg}
                onChangeText={setMsg}
                placeholderTextColor="grey"
                onFocus={() => { setIsFocused(true); setShowCards(false); }}
                onBlur={() => setIsFocused(false)}
              />
              <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
                {msg.trim() ? (
                  <FontAwesome name="paper-plane" size={20} color={'#2dabeb'} />
                ) : (
                  <FontAwesome name="paper-plane" size={20} color={'#2dabeb'} />
                )}
              </TouchableOpacity>
              
            </View>
          </SafeAreaView>
        </ImageBackground>
      </GestureHandlerRootView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
      flex: 1,
     
     
    },
    WelcomeContainer: {
      flex: 5,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 20,
    },
    MessageContainer: {
      paddingBottom: 20,
      flexGrow: 1,
    },
    input: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 25,
      paddingVertical: 8,
      paddingHorizontal: 15,
      marginRight: 10,
      color: 'black',
    },
    inputView: {
      flexDirection: 'row',
      borderColor: '#2dabeb',
      borderWidth: 1,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      marginBottom: 50,
      marginLeft: 15,
      backgroundColor: '#fff',
      borderRadius: 30,
    },
    button: {
      backgroundColor: '#fff',
      borderRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    message: {
      maxHeight: '100%',
      padding: 12,
      borderRadius: 15,
      marginBottom: 12,
  
      shadowColor: '#000',
      textShadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 1,
    },
    messagetextUser: {
      fontSize: 16,
      color: '#fff',
     
    },
    messagetextGimii: {
      fontSize: 16,
      color: '#0C0C0C',
    },
    userMessage: {
      backgroundColor: '#2dabeb',
      alignSelf: 'flex-end',
      borderBottomRightRadius: 0,
       marginRight:10,
       marginLeft : 5 ,
    },
    geminiMessage: {
      backgroundColor: '#ECECEC',
      alignSelf: 'flex-start',
      borderBottomLeftRadius: 0,
      maxWidth: '90%',
      marginLeft : 10,
    },
    headerImage: {
      width: 80,
      height: 80,
      marginBottom: 20,
      marginTop: 20,
    },
    cardContainer: {
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: 10,
      marginTop: 75,
    },
    card: {
      backgroundColor: '#F5FBFE',
      padding: 15,
      borderColor: '#73C7F2',
      borderWidth: 1.5,
      borderRadius: 20,
      marginBottom: 35,
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
    cardImage: {
      width: 60,
      height: 60,
      marginRight: 10,
      borderRadius: 50,
      borderColor: '#73C7F2',
      borderWidth: 1,
    },
    cardText: {
      flex: 1,
      color: '#2379A5',
      fontSize: 16,
      textAlign: 'center',
          // Rendre le texte en gras
      fontStyle: 'italic',    // Rendre le texte en italique
    },
    typingIndicatorContainer: {
      alignItems: 'flex-start',
      marginBottom: 12,
      marginLeft : 5 ,
    },
    typingBubble: {
      backgroundColor: '#ECECEC',
      padding: 10,
      borderRadius: 15,
  
      maxWidth: '60%',
      flexDirection: 'row', // Affiche les points en ligne
      justifyContent: 'space-evenly',
    },
    typingDots: {
      fontSize: 20,
      color: 'grey',
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
      elevation: 5,
      zIndex: 10,  // For Android shadow
    },
    speechButton: {
        marginTop: 5,
        padding: 10,
        backgroundColor: '#2dabeb',
        borderRadius: 15,
        alignSelf: 'flex-start',
      },
      Playbutton: {
        padding : 3 ,
        marginTop : 7 ,
        color: 'red',
        fontSize: 14,
      },
      headerTitle: {
        
        textShadowOffset: { width: 2, height: 2 },
        textShadowColor: 'rgba(85, 85, 85, 0.5)', // Utilisez une couleur rgba pour une ombre plus douce
        textShadowRadius: 6,
        fontSize: 40,
        color: '#5ABDEF',
        fontFamily: 'Allan_700Bold',
         
    }
  });
  

export default Page;