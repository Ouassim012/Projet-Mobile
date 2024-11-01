import {StyleSheet, ScrollView,Text,TouchableOpacity,View} from 'react-native'
import React, { useRef, useState } from 'react'
import destinationCategories from '@/app/constants/categories'
import { MaterialCommunityIcons } from '@expo/vector-icons'


type Props={
    onCategoryChanged:(category :string )=> void;
}
const CategoryButtons=({onCategoryChanged}:Props)=>{
    
    const scrollRef=useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null[]>([]);
    const [activeIndex, setActiveIndex]=useState(0); 
    const handleSelectCategory = (index: number) => {
        const selected = itemRef.current![index];
setActiveIndex(index)
console.log(index)
selected?.measureLayout(
    scrollRef.current as any, // specify the reference view for accurate positioning
    (x, y) => {
        console.log("The true x position is:", x);
        scrollRef.current?.scrollTo({ x, y: 0, animated: true });
    },
    () => console.log("Measurement failed") // Optional error callback
);
onCategoryChanged(destinationCategories[index].title);
    };
    return (
        <View>
            <Text style={styles.title}>Categories</Text>
            <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
                
                gap:20,
                paddingVertical:10,
                marginBottom:10
            }}>
                {destinationCategories.map((item,index)=>(
                    <TouchableOpacity key={index} ref={(el) => itemRef.current[index] = el} onPress={()=> handleSelectCategory(index)} style={activeIndex == index ? styles.categroyBtnActive :styles.CategroyButton}>
                        <MaterialCommunityIcons name ={item.iconName as any } size={20} color={activeIndex == index ? 'white':'black'}/>
                    <Text style={activeIndex == index ? styles.categroyBtnTxtActive :styles.categroyBtnTxt}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}
export default CategoryButtons

const styles= StyleSheet.create({
title:{
    fontSize:22,
    fontWeight:'700',
    color:'black',
},
CategroyButton:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'white',
    paddingHorizontal:16,
    paddingVertical:10,
    borderRadius:10,
    shadowColor:'#333333',
    shadowOffset:{width:1,height:2},
    shadowOpacity:0.1,
    shadowRadius:3,
},
categroyBtnTxt:{
    marginLeft:5,
    color:'black',

},
categroyBtnActive:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#2dabeb',
    paddingHorizontal:16,
    paddingVertical:10,
    borderRadius:10,
    shadowColor:'#333333',
    shadowOffset:{width:1,height:2},
    shadowOpacity:0.1,
    shadowRadius:3,
},
categroyBtnTxtActive:{
    marginLeft:5,
    color:'white',
}
})