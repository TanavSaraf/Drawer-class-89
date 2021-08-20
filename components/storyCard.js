import AppLoading from "expo-app-loading";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import {FlatList} from 'react-native-gesture-handler'
let customFonts = {
  "bubblegum-sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class FeedRead extends React.Component {
  constructor(props){
    super(props)
    this.state={
      fontsLoaded:false,

    }
  }
  async loadFontAsync(){
    await Font.loadAsync(customFonts)
    this.setState({fontsLoaded:true})
  }
  
  componentDidMount(){
    this.loadFontAsync()
  }
    
  
  render() {
    if(this.state.fontsLoaded){
      
    return (
      <View style={styles.container}>
        <Text>{this.props.story.title}</Text>

      </View>
    );
    }else{return <AppLoading/>}
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
