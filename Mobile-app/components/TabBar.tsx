import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons';
import TabBarButton from './TabBarButton';
export function TabBar({ state, descriptors, navigation }:BottomTabBarProps) {

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
          key={route.name}
          onPress={onPress}
          onLongPress={onLongPress}
          isFocused={isFocused}
          routeName={route.name}
          color={isFocused?'#673ab7':'#222'}
          label={label}/>
          /*
          <TouchableOpacity
          key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {icon[route.name]({
              color:isFocused?'#673ab7':'#222'
            })}
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>*/
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
tabbar:{
  position:"absolute",
  bottom:20,
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  backgroundColor:'#fff',
  marginHorizontal:80,
paddingVertical:15,
borderRadius:35,
shadowColor:'#000',
shadowOffset:{
  width:100,height:80
},
shadowRadius:10,
shadowOpacity:0.9,
},
tabbarItem:{
flex:1,
justifyContent:'center',
alignItems:'center',
gap:5
}
})