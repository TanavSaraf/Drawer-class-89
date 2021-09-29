import firebase from "firebase";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export default class CustomeSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightTheme: false,
      image:'#'
    };
  }
  componentDidMount() {
    var theme;
    var image;
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .on("value", (data) => {
        theme = data.val().currentTheme;
        image=data.val().profilePicture
        this.setState({ lightTheme: theme == "light" ? true : false,image:image });
      });
  }
  render() {
    var props=this.props
    return (
      <View
        style={
          this.state.lightTheme
            ? [styles.container, { backgroundColor: "grey" }]
            : styles.container
        }
      >
          <Image source={{uri:this.state.image}} style= {{width:50,height:50,borderRadius:30,alignSelf:'center'}}/>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props}/>
        </DrawerContentScrollView>
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
});
