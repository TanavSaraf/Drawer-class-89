import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./screens/dashboard";
import Loading from "./screens/loading";
import Login from "./screens/login";
import firebase from "firebase";
import {firebaseConfig} from './config';
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}else{
  firebase.app()
}
const StackNav = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackNav.Navigator screenOptions={{headerShown:false}}>
        <StackNav.Screen name="Loading" component={Loading} />
        <StackNav.Screen name="Login" component={Login} />
        <StackNav.Screen name="DashBoard" component={Dashboard} />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
