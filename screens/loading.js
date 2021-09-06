import AppLoading from "expo-app-loading";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import firebase from "firebase";
let customFonts = {
  "bubblegum-sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class Loading extends React.Component {
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
  checkLoggedIn=()=>{
      firebase.auth().onAuthStateChanged((user)=>{
          if(user){
            this.props.navigation.navigate('DashBoard')
          }else {
              this.props.navigation.navigate('Login')
          }
      })
  }
  componentDidMount() {
    this.loadFontAsync();

    this.checkLoggedIn()
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          
                    
        </View>
      );
    } else {
      return <View>
      <SafeAreaView style={styles.droidSafeArea} />
      <AppLoading />

      </View>;
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
