import AppLoading from "expo-app-loading";
import React from "react";
import { StyleSheet, Text, View,Platform,SafeAreaView,StatusBar ,Switch} from "react-native";

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
      isEnabled:false,
      lightTheme:false,
      profileImage:'',
      name:''
    };
  }
  fetchUser=async ()=>{
    var theme,name,profileImage
    await firebase.database().ref("users/" + firebase.auth().currenUser.uid).on('value',(data)=>{
      theme=data.val().currentTheme
      name=data.val().firstName+' '+data.val().lastName
      profileImage=data.val().profilePicture    
    
    })
    this.setState({
      name:name,
      profileImage:profileImage,
      lightTheme:theme=='light'?true:false,
      isEnabled:theme=='light'?false:true,
    })
  }
  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
    
  }

  componentDidMount() {
    this.loadFontAsync();
    this.fetchUser()
  }
  renderItem = ({ item, index }) => {
    return <StoryCard story={item} navigation={this.props.navigation}/>;
  };
  render() {
    if (this.state.fontsLoaded&&this.state.name!=='') {
      return (
        <View style={styles.container}>
          <SafeAreaView style={ styles.droidSafeArea}/>
          <Text style={styles.title}>{this.state.name}</Text>
        <View><Text>Dark Theme</Text><Switch/></View>
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
    margin:2,
    borderWidth:2,
    backgroundColor: "#0009ff",
    borderRadius: 20,
    margin: 10,
    
  },
  droidSafeArea: { marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35) },
  title:{
    fontFamily: "bubblegum-sans",
    fontSize: RFValue(20),
    color: "white",
    borderWidth: 2,
    borderRadius: 5,
    margin:10,
    textAlign:'center'
  }
});

