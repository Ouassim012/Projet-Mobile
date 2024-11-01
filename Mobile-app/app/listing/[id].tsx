import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import listingData from "../constants/destinations.json";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Audio } from 'expo-av'; // Import the Audio module
import { Asset } from 'expo-asset'; // Import Asset

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

interface ListingType {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: string;
  price: string;
  duration: string;
  location: string;
  category: string;
  audio_url:string
}

const ListingDetails: React.FC = () => {
  

    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [buttonText, setButtonText] = useState("Play"); 
   
    useEffect(() => {
        return () => {
            sound?.unloadAsync(); // Unload the sound to free resources
        };
    }, [sound]);
      // Initial button text

  const { id } = useLocalSearchParams();
  const listing: ListingType | undefined = (listingData as ListingType[]).find(
    (item) => item.id === id
  );

  if (!listing) {
    return <Text>Listing not found</Text>;
  }
  const audioFiles: { [key: string]: any } = {
    "1": require("./1.mp3"),
    "2": require("./2.mp3"),
    "3": require("./3.mp3"),
    "4": require("./4.mp3"),
    "5": require("./5.mp3"),
    // Add more mappings as needed
  };
  
 const handleButtonPress = async () => {
        if (isPlaying) {
          
            console.log("pausing");
            await sound?.pauseAsync(); // Pause the sound if it's currently playing
            setIsPlaying(false);
            setButtonText("Play"); // Update button text to Play
        } else {
          const audioAsset = Asset.fromModule(audioFiles[listing.id]);
    await audioAsset.downloadAsync();
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: audioAsset.uri } // Use the file_url from the listing
            );
            setSound(newSound);
            await newSound.playAsync(); // Play the sound
            console.log("playing");
            setIsPlaying(true);
            setButtonText("Pause"); // Update button text to Pause
        }
    };
const router = useRouter()
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{backgroundColor:"rgba(255,255,255,0.5)",borderRadius:10,padding:4}}>
                <View style={{backgroundColor:'white',padding:0,borderRadius:10}}>
              <Feather name="arrow-left" size={30} color={'gray'} /></View>
            </TouchableOpacity>
          ),
          headerRight:()=>(
            <TouchableOpacity onPress={() => router.back()} style={{backgroundColor:"rgba(255,255,255,0.5)",borderRadius:10,padding:4}}>
            <View style={{backgroundColor:'white',padding:1,borderRadius:10}}>
          <Ionicons name="bookmark-outline" size={30} color={'gray'}/></View>
        </TouchableOpacity>
          )
        }}
      />
      <View style={styles.container}>
      <Image source={{ uri: listing.image }} style={styles.image} />
     <View style={styles.contentWrapper}>
        <Text style={styles.listingName}>{listing.name}</Text>
        <View style={styles.listingLocationWrapper}>
            <FontAwesome5 name="map-marker-alt" size={20} color={"#2dabeb"}/>
            <Text style={styles.listingLocationText}>{listing.location}</Text>
        </View>

        <View style={styles.highlighWrapper}>
            <View style={{flexDirection:'row'}}>
                <View style={styles.higjlightIcon}>
                    <Ionicons name="time" size={20} color={'#2dabeb'}/>
                </View>

                <View>
                    <Text style={styles.highlightxt}>Duration</Text>
                    <Text style={styles.highlighttxtvalue}>{listing.duration} hours</Text>
                </View>
            </View>

            <View style={{flexDirection:'row'}}>
                <View style={styles.higjlightIcon}>
                    <FontAwesome5 name="users" size={20} color={'#2dabeb'}/>
                </View>

                <View>
                    <Text style={styles.highlightxt}>Person</Text>
                    <Text style={styles.highlighttxtvalue}>{listing.duration} hours</Text>
                </View>
            </View>

            <View style={{flexDirection:'row'}}>
                <View style={styles.higjlightIcon}>
                    <Ionicons name="star" size={20} color={'#2dabeb'}/>
                </View>

                <View>
                    <Text style={styles.highlightxt}>Stars</Text>
                    <Text style={styles.highlighttxtvalue}>{listing.rating} hours</Text>
                </View>
            </View>
        </View>

<Text style={styles.listingdetails}>{listing.description}</Text>
<TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.buttonText}>{isPlaying ? "Pause" : "Play"}</Text>
          </TouchableOpacity>

     </View>
     </View>
    </View>
  );
};

export default ListingDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",

  },
  contentWrapper:{
padding:20
  },
  image: {
    width: width,
    height: IMG_HEIGHT,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  listingName:{
fontSize:24,
fontWeight:"500",
color:'black',
letterSpacing:0.5,
  },
  listingLocationWrapper:{
    flexDirection:'row',
    marginTop:5,
    marginBottom:10,
    alignItems:'center'
  },
  listingLocationText:{
    fontSize:14,
    marginLeft:5,
    color:'black'
  },
  highlighWrapper:{
    flexDirection:'row',
    marginVertical:20,
    justifyContent:'space-between',

  },
  higjlightIcon:{
    backgroundColor:'#F4F4F4',
    paddingHorizontal:8,
    paddingVertical:5,
    borderRadius:0,
    marginRight:5,
    alignItems:'center'
  },
  highlightxt:{
    fontSize:12,
    color:'#999'
  },
  highlighttxtvalue:{
fontSize:14,
fontWeight:'600',
  },
  listingdetails:{
    fontSize:18,
    color:'black',
    lineHeight:25,
    letterSpacing:0.5
  },
  button: {
    marginTop: 20,
    backgroundColor: "black",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  }
});
