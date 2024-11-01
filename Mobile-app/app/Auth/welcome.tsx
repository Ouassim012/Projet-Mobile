import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, ImageBackground, SafeAreaView ,Animated} from 'react-native';
import React from 'react';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';  // Import the router
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get("window");

const Page = () => {
    const router = useRouter();  // Initialize the router for navigation
    const translateY = useRef(new Animated.Value(0)).current; // Valeur initiale pour le mouvement vertical

    useEffect(() => {
        const animate = () => {
            translateY.setValue(0); // Recommence à la position initiale
            Animated.timing(translateY, {
                toValue: 10, // Déplace l'image vers le bas
                duration: 500, // Durée de l'animation
                useNativeDriver: true, // Utiliser le driver natif pour de meilleures performances
                // La fonction de rappel pour revenir à la position initiale
            }).start(() => {
                Animated.timing(translateY, {
                    toValue: 0, // Reviens à la position initiale
                    duration: 500,
                    useNativeDriver: true,
                }).start(animate); // Recommence l'animation
            });
        };

        animate();
    }, [translateY]);


    return (
        <LinearGradient
        colors={['#ECECEC', '#2dabeb']} // Utilise les couleurs du dégradé
        start={{ x: 0.5, y: 0 }} // Début au milieu en haut
  end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View>

                    <View style={{paddingTop: 30}}>
                    <ImageBackground
                        style={{
                            height: height / 2.5,
                            marginTop: 50,
                            
                            
                        }}
                        resizeMode="contain"
                        source={require("../../assets/images/welcome-img.png")}
                    />
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 22,
                            paddingTop: 20,
                            width:"100%"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 45,
                                fontWeight:800,
                                color: Colors.primary,
                                fontFamily: Font["poppins-bold"],
                              
                            }}
                        >
                            Bienvenue 
                        </Text>
                        <Text style={{
                            fontSize: 45,
                            fontWeight:800,
                            color: Colors.primary
                        }}> 
                          Sur Serenity !</Text>

                        <View style={{ marginVertical:22 }} >
                        <Text
                            style={{
                              fontSize:14,
                              color: Colors.primary,
                              marginVertical:4
                              
                            }}
                        >Votre Compagnon Pour Soulager Le Stress 
                        </Text >
                        <Text  style={{
                              fontSize:14,
                              color: Colors.primary
                    
                              
                            }}>Votre Clé Pour Retrouver La Sérénité</Text>
                        </View>
                    </View>

                    <View
                        style={{
                            paddingHorizontal: Spacing * 2,
                            paddingTop: Spacing * 3,
                            flexDirection: "row",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => router.push('/Auth/register')}
                            style={{
                                backgroundColor: Colors.primary,
                                paddingVertical: 10,
                                paddingBottom:16,
                                //paddingHorizontal: Spacing * 2,
                                //width: "48%",
                                borderRadius: 12,
                                borderWidth:2,
                                borderColor:Colors.primary,
                                //shadowColor: Colors.active,
                                //shadowOffset: {
                                 //   width: 0,
                                 //   height: Spacing,
                               // },
                               // shadowOpacity: 0.3,
                               // shadowRadius: Spacing,
                               alignItems:'center',
                               justifyContent:'center',
                               width:"100%"
                              
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: Font["poppins-bold"],
                                    color: Colors.active,
                                    fontSize: 18,
                                    fontWeight:'bold',
                                    textAlign: "center",
                                }}
                            >
                                S'incrire
                            </Text>


    
                        </TouchableOpacity>
                       
                    </View>

                    <View style={{flexDirection:"row",flexDirection:"row",marginTop:12,justifyContent:'center'}}>
                    <TouchableOpacity
                            onPress={() => router.push('/Auth/login')}
                            
                        >
                           
                            <Text
                                style={{
                                   
                                    color: Colors.primary,
                                    fontSize: 16,
                                    textAlign: "center",
                                }}
                            >
Vous avez déjà un compte ? 
                            </Text>
                            
                        </TouchableOpacity>
                        </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Page;

const styles = StyleSheet.create({
    gradient: {
        flex: 1, // Assure-toi que le LinearGradient prend tout l'espace
    },
});
