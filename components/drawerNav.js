import React from "react";
import StackFunction from "./stackNav";
import Profile from "../screens/Profile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LogOut from "../screens/logout";
import BookProv from "../screens/bookProv";
import BookReq from "../screens/bookReq";
import CustomeSidebar from "./customeSidebar";
const Drawer = createDrawerNavigator();
class DrawerFunction extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    var props=this.props
    return (
      <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContentOptions={{
        itemStyle:{marginTop:50}
      }} drawerContent={(props)=>(<CustomeSidebar {...props}/>)}>
        <Drawer.Screen name="Home" component={StackFunction} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Books" component={BookReq} />
        <Drawer.Screen name="Provide Books" component={BookProv} />
        <Drawer.Screen name="LogOut" component={LogOut} />
      </Drawer.Navigator>
    );
  }
};
export default DrawerFunction;
