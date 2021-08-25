import AppLoading from "expo-app-loading";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";

let customFonts = {
  "bubblegum-sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class FeedRead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }
  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFontAsync();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <TouchableOpacity style={styles.container} 
        onPress={()=>{
          this.props.navigation.navigate('FullStory',{story:this.props.story})
        }}>
          <Text style={styles.title}>{this.props.story.title}</Text>
          <Image
            source={require("../assets/story_image_1.png")}
            style={{ width: RFValue(100), height: RFValue(100) }}
          />
          <Text style={styles.description}>{this.props.story.description}</Text>
          <Text style={styles.author}>{this.props.story.author}</Text>
        </TouchableOpacity>
      );
    } else {
      return <AppLoading />;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0009ff",
    borderRadius: 20,
    margin: 10,
  },

  title: {
    fontFamily: "bubblegum-sans",
    fontSize: RFValue(20),
    color: "white",
  },
  description: {
    fontFamily: "bubblegum-sans",
    fontSize: RFValue(10),
    color: "grey",
  },

  author: {
    fontFamily: "bubblegum-sans",
    fontSize: RFValue(10),
    color: "#ffffdd",
  },
});
