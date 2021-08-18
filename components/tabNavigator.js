import React from "react";
import Feed from "../screens/feed"
import CreateStory from "../screens/create";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const TabNav = createBottomTabNavigator();
const BottomTabNav = () => {
  return (
    <TabNav.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          var iconName;
          if (route.name == "feed") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name == "create") {
            iconName = focused ? "create" : "create-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{ activeTintColor: "red", inactiveTintColor: "grey" }}
    >
      <TabNav.Screen name="feed" component={Feed} />
      <TabNav.Screen name="Create" component={CreateStory} />
    </TabNav.Navigator>
  );
};
export default BottomTabNav;
