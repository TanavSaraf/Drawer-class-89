import AppLoading from "expo-app-loading";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import { FlatList } from "react-native-gesture-handler";
import StoryCard from "../components/storyCard";
let customFonts = {
  "bubblegum-sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
let stories = require("../temp_stories.json");
export default class Login extends React.Component {
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "739623127370-gsfor8coli1a66s9nk7v7rvbk6o1lt1b.apps.googleusercontent.com",
        iosClientId:
          "739623127370-k46vclemagj7gvvdedfhlur4js77vji5.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.signInWithGoogleAsync();
          }}
        >
          <Text style={styles.title}>SIGN IN WITH GOOGLE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    borderWidth: 2,
    backgroundColor: "#0009ff",
    borderRadius: 20,
    margin: 10,
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  title: {
    fontFamily: "bubblegum-sans",
    fontSize: RFValue(10),
    color: "black",
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    textAlign: "center",
  },
});
