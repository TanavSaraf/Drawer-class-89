import AppLoading from "expo-app-loading";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import firebase from 'firebase';
import DropDownPicker from "react-native-dropdown-picker";

let customFonts = {
  "bubblegum-sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class FeedRead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "image_1",
      dropDownHeight: RFValue(20),
      title: "",
      description: "",
      story: "",
      moral: "",
      open: false,
      lightTheme:true
    };
  }
  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  };
  fetchUser =  () => {
    var theme
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .on("value", (data) => {
        theme = data.val().currentTheme;
      });
      console.log(theme)
    this.setState({
      lightTheme: theme == "light" ? true : false,
      
    });
  };
  
  componentDidMount() {
    this.loadFontAsync();
    this.fetchUser()
  }

  render() {
    if (this.state.fontsLoaded) {
      var previewImages = {
        image_1: require("../assets/story_image_1.png"),
        image_2: require("../assets/story_image_2.png"),
        image_3: require("../assets/story_image_3.png"),
        image_4: require("../assets/story_image_4.png"),
        image_5: require("../assets/story_image_5.png"),
      };
      return (
        <View style={this.state.lightTheme?styles.container:[styles.container,{backgroundColor:'grey'}]}>
          <SafeAreaView style={styles.droidSafeArea} />
          <Text style={styles.title}>Create Story</Text>
          <ScrollView>
            <Image
              source={previewImages[this.state.previewImage]}
              style={{
                width: RFValue(100),
                height: RFValue(100),
                alignSelf: "center",
                margin: 2,
                borderWidth: 2,
              }}
            />
            <View style={{ height: RFValue(this.state.dropDownHeight) }}>
              <DropDownPicker
                style={{ backgroundColor: "transparent" }}
                itemStyle={{ justifyContent: "left" }}
                open={this.state.open}
                labelStyle={{ color: "white" }}
                containerStyle={{ height: 40, borderRadius: 20, margin: 10 }}
                items={[
                  { label: "image_1", value: "image_1" },
                  { label: "image_2", value: "image_2" },
                  { label: "image_3", value: "image_3" },
                  { label: "image_4", value: "image_4" },
                  { label: "image_5", value: "image_5" },
                ]}
                defaultValue={this.state.previewImage}
                onOpen={() => {
                  this.setState({ dropDownHeight: RFValue(190), open: true });
                }}
                onClose={() => {
                  this.setState({ dropDownHeight: RFValue(20), open: false });
                }}
                onChangeItem={(item) => {
                  this.setState({ previewImage: item.value });
                }}
              />
            </View>

            <View style={{ marginTop: RFValue(30) }}>
              <TextInput
                style={styles.inputs}
                placeholder="StoryName"
                onChangeText={(item) => {
                  this.setState({ title: item });
                }}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Describe it"
                multiline={true}
                onChangeText={(item) => {
                  this.setState({ description: item });
                }}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Story"
                multiline={true}
                onChangeText={(item) => {
                  this.setState({ story: item });
                }}
              />
              <TextInput
                style={styles.inputs}
                placeholder="moral"
                multiline={true}
                onChangeText={(item) => {
                  this.setState({ moral: item });
                }}
              />
            </View>
          </ScrollView>
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
    backgroundColor: "#0009ff",
    borderRadius: 20,
    margin: 10,
  },

  inputs: {
    fontFamily: "bubblegum-sans",
    fontSize: RFValue(10),
    color: "white",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    paddingLeft: 10,
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
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
});
