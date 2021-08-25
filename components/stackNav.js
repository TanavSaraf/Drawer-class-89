import React from "react";
import TabNav from "./tabNavigator";
import Read from "../screens/viewStory";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const StackFunction = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
     
      <Stack.Screen name="Feed" component={TabNav} />
      <Stack.Screen name='FullStory' component={Read}/>
    </Stack.Navigator>
  );
};
export default StackFunction;
