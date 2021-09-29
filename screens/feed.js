import AppLoading from "expo-app-loading";
import React from "react";
import firebase from 'firebase';
import { StyleSheet, Text, View,Platform,SafeAreaView,StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import { FlatList } from "react-native-gesture-handler";
import StoryCard from "../components/storyCard";
let customFonts = {
  "bubblegum-sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class FeedRead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      stories:[],

    };
  }
  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  fetchStories=()=>{
    firebase.database().ref('stories').on('value',(data)=>{

      var stories=[]
      if(data.val()){
        Object.keys(data.val())
        .forEach((key)=>{
            stories.push({key:key,value:data.val()[key]})
        })
        
      this.setState({stories:stories})
      console.log(data.val())
      }

    })
  }
  componentDidMount() {
    this.loadFontAsync();
    this.fetchStories()
  }
  renderItem = ({ item, index }) => {
    return <StoryCard story={item} navigation={this.props.navigation}/>;
  };
  render() {
    if (this.state.fontsLoaded &&this.state.stories.length!==0) {
      return (
        <View style={styles.container}>
          <SafeAreaView style={ styles.droidSafeArea}/>
          <Text style={styles.title}>Feed Screen</Text>
          <FlatList
            data={this.state.stories}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={this.renderItem}
          />
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
  },  title: {
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
