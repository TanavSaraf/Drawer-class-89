import AppLoading from "expo-app-loading";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import * as Speech from "expo-speech";
import Ionicons from "react-native-vector-icons/Ionicons";
let customFonts = {
  "bubblegum-sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class Read extends React.Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
      speakerIcon: "volume-high",
      speakerColor: "gray",
    };
  }
  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  initiateTTS = async (title,author,story,moral) => {
    this.setState({
      speakerColor: this.state.speakerColor === "gray" ? "blue" : "gray",
    });

    if(this.state.speakerColor==='gray'){
      Speech.speak(`${title} by ${author}`)
      Speech.speak(story)
      Speech.speak(`The moral is , ${moral}`)
    }else{
      Speech.stop()
    }
  };
  componentDidMount() {
    this.loadFontAsync();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <Text style={styles.title}>
            {this.props.route.params.story.title}
          </Text>
          <Text>{this.props.route.params.story.value.author}</Text>
          <Text>{this.props.route.params.story.value.story}</Text>
          <Text>{this.props.route.params.story.value.created_on}</Text>
          <Text>{this.props.route.params.story.value.moral}</Text>
          <TouchableOpacity
            onPress={() => {
              this.initiateTTS(
                this.props.route.params.story.value.title,
                this.props.route.params.story.value.author,
                this.props.route.params.story.value.story,
                this.props.route.params.story.value.moral
              );
            }}
          >
            <Ionicons
              name={this.state.speakerIcon}
              color={this.state.speakerColor}
              size={RFValue(10)}
            />
          </TouchableOpacity>
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
    backgroundColor: "white",
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
