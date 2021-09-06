import React from "react";
import { View, Text } from "react-native";

import firebase from "firebase";
export default class LogOut extends React.Component {
  componentDidMount() {
    firebase.auth().signOut();
  }
  render() {
    return (
      <View >
        
        <Text>LogOut</Text>
      </View>
    );
  }
}
