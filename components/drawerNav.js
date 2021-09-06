import React from "react";
import StackFunction from "./stackNav";
import Profile from "../screens/Profile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LogOut from "../screens/logout";
const Drawer = createDrawerNavigator();
const DrawerFunction = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown:false}} >
     
      <Drawer.Screen name="Home" component={StackFunction} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="LogOut" component={LogOut} />
    </Drawer.Navigator>
  );
};
export default DrawerFunction;
