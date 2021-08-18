import React from "react";
import TabNav from "./tabNavigator";
import Profile from "../screens/Profile";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
const DrawerFunction = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="profile" component={Profile} />
      <Drawer.Screen name="TabNav" component={TabNav} />
    </Drawer.Navigator>
  );
};
export default DrawerFunction;
