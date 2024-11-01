import { StyleSheet,Text,View, FlatList, ListRenderItem, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from 'react'
import { Image } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
type  Props={
    listings:any[],
    category :string
}
const Listings=({listings,category}:Props)=>{
    console.log("the categories passed",category)
    const [loading,setLoading] = useState(false);
    useEffect(()=>{

        console.log("update listing");
        setLoading(true);
        setTimeout(()=>{
    setLoading(false)
        },200)
    },[category])
    const filteredListings = category === 'Tous' ? listings : listings.filter(listing => listing.category === category);

const renderItems:ListRenderItem<ListingType>=  ({item})=>{
return (
    <Link href={`/listing/${item.id}`} asChild>
    <TouchableOpacity>
        <View style={styles.item}>
            <Image source={{uri: item.image}}  style={styles.image}/>
            <View style={styles.bookmark}>
        <Ionicons name="bookmark-outline" color={'white'} size={20}/>
        
        </View>
        <Text style={styles.itemTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
         
                <Text style={styles.itemLocationTxt}>{item.duration} </Text><Ionicons name="time" size={14} color={'#2dabeb'} style={{}}/>
            </View>
            <Text style={styles.itemPriceTxt}>                    
            {item.rating} </Text><Ionicons name="star" size={15} color={'#2dabeb'} style={{}}/>
        </View>
         </View>
         
        
        
        
    </TouchableOpacity>
    </Link>
)
    }
    return(
        <View>
            <FlatList data={loading ? [] : filteredListings} renderItem={renderItems} horizontal showsHorizontalScrollIndicator={false}/>
        </View>
    )
}

export default Listings;
const styles = StyleSheet.create({
item:{
    backgroundColor:'white',
    padding:10,
    borderRadius:10,
    marginRight:6,
    width:220
},
image:{
    width:200,
    height:200,
    borderRadius:10,
    marginBottom:30
},
bookmark:{
    position:'absolute',
    top:185,
    right:30,
    backgroundColor:"#2dabeb",
    padding:10,
    borderRadius:30,
    borderWidth:2,
    borderColor:'white'
},
itemTxt:{
    fontSize:16,
    fontWeight:'600',
    color:'black',
    marginBottom:10,

},
itemLocationTxt:{
    fontSize:12,
    marginLeft:5
},
itemPriceTxt:{
    fontSize:12,
    fontWeight:'600',
    color:'#2dabeb',
    marginLeft:117

}
})


interface ListingType{
    id:string;
    name:string;
    image:string;
    description:string;
    rating:string;
    price:string;
    duration:string;
    location:string;
    category:string; 
}