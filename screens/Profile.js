import AppLoading from "expo-app-loading";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  Switch,
  Image
} from "react-native";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";

import StoryCard from "../components/storyCard";
let customFonts = {
  "bubblegum-sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};
let stories = require("../temp_stories.json");
export default class FeedRead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled: false,
      lightTheme: false,
      profileImage: "",
      name: "",
    };
  }
  fetchUser = async () => {
    var theme, name, profileImage;
    await firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .on("value", (data) => {
        theme = data.val().currentTheme;
        name = data.val().firstName + " " + data.val().lastName;
        profileImage = data.val().profilePicture;
      });
    this.setState({
      name: name,
      profileImage: profileImage,
      lightTheme: theme == "light" ? true : false,
      isEnabled: theme == "light" ? false : true,
    });
  };
  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  toggleSwitch = () => {
    const previousState = this.state.isEnabled;
    var theme=this.state.isEnabled?'light':'dark'
    firebase.database().ref('users/'+firebase.auth().currentUser.uid).update({
      currentTheme:theme
    })
    this.setState({isEnabled:!previousState,lightTheme:previousState})
  };
  componentDidMount() {
    this.loadFontAsync();
    this.fetchUser();
  }
  renderItem = ({ item, index }) => {
    return <StoryCard story={item} navigation={this.props.navigation} />;
  };
  render() {
    if (this.state.fontsLoaded && this.state.name !== "") {
      return (
        <View style={this.state.isEnabled?styles.container:styles.containerLT}>
          <SafeAreaView style={styles.droidSafeArea} />
          <Image source={{uri:this.state.profileImage}} style={{width:100,height:100}}/>
          <Text style={styles.title}>{this.state.name}</Text>
          
          <View style={{ flexDirection: "row" }}>
            <Text style={{color:this.state.isEnabled?'white':'black'}}>Dark Theme</Text>
            <Switch
              value={this.state.isEnabled}
              thumbColor={this.state.isEnabled ? "red" : "white"}
              onValueChange={() => {
                this.toggleSwitch();
              }}
            />
          </View>
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    borderWidth: 2,
    backgroundColor: "navy",
    borderRadius: 20,
    margin: 10,
  },
  containerLT: {
    flex: 1,
    margin: 2,
    borderWidth: 2,
    backgroundColor: "grey",
    borderRadius: 20,
    margin: 10,
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  title: {
    fontFamily: "bubblegum-sans",
    fontSize: RFValue(20),
    color: "white",
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    textAlign: "center",
  },
  
});
