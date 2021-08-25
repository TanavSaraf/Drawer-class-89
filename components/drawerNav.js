import React from "react";
import StackFunction from "./stackNav";
import Profile from "../screens/Profile";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
const DrawerFunction = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown:false}} >
     
      <Drawer.Screen name="Home" component={StackFunction} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};
export default DrawerFunction;
