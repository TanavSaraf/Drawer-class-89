import React from "react";
import { StyleSheet } from "react-native";
import Feed from "../screens/feed";
import CreateStory from "../screens/create";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
const TabNav = createMaterialBottomTabNavigator();
const BottomTabNav = () => {
  return (
    <TabNav.Navigator
      labeled={false}
      barStyle={styles.bottomTabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          var iconName;
          if (route.name == "feed") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name == "create") {
            iconName = focused ? "create" : "create-outline";
          }
          return <Ionicons style={styles.icon} name={iconName} size={RFValue(25)} color={color} />;
        },
      })}
      activeColor={"red"}
      inactiveColor="black"
    >
      <TabNav.Screen name="feed" component={Feed} />
      <TabNav.Screen name="create" component={CreateStory} />
    </TabNav.Navigator>
  );
};
export default BottomTabNav;

var styles = StyleSheet.create({
  bottomTabStyle: { borderTopLeftRadius: 20, backgroundColor: "aqua",height:'8%',position:'absolute',overflow:'hidden' },
  icon:{width:RFValue(30),height:RFValue(40)}
});
