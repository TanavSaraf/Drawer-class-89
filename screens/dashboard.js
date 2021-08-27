import React from "react";
import { SafeAreaView, StyleSheet, Text, View,StatusBar,Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
export default class Dashboard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea}/>
        <Text>Profilee</Text>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  droidSafeArea: { marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35) },
});
