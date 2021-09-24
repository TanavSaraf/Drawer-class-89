import AppLoading from "expo-app-loading";
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
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import { BookSearch } from "react-native-google-books";
let customFonts = {
  "bubblegum-sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class FeedRead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      bookName: "",
      dataSrc: "",
      userId: firebase.auth().currentUser.email,
    };
  }
  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  fetchBook = async (bookName) => {
    if (bookName.length > 2) {
      var book = await BookSearch.searchbook(
        bookName,
        "AIzaSyA7wWcuJkBkmT5l_TGNmbq32q24KOYsOR4"
      );
      console.log(book);
      this.setState({
        dataSrc: book.data,
      });
    }
  };
  componentDidMount() {
    this.loadFontAsync();
  }
  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 30,
          borderBottomWidth: 0.7,
          backgroundColor: "white",
          margin: 20,
          borderRadius: 10,
        }}
        onPress={() => {
          this.addReq(item);
        }}
      >
        <Text style={{ fontSize: 20, width: "60%" }}>
          {item.volumeInfo.title}
        </Text>
        <Image
          source={{ uri: item.volumeInfo.imageLinks.smallThumbnail }}
          style={{ width: 50, height: 70, borderRadius: 2 }}
        />
      </TouchableOpacity>
    );
  };
  addReq = async (item) => {
    var reqId = Math.random().toString(36).substring(3);
    firebase
      .database()
      .ref("requestedBooks/" + reqId)
      .update({
        userId: this.state.userId,
        bookName: item.volumeInfo.title,
        imageLink: item.volumeInfo.imageLinks.smallThumbnail,
        reqId: reqId,
      });
  };
  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <Text style={styles.title}>Read Stories</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={(text) => {
              this.setState({ bookName: text });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.fetchBook(this.state.bookName);
            }}
          >
            <Text>Search</Text>
          </TouchableOpacity>
          <FlatList
            data={this.state.dataSrc}
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
  inputs: {
    fontFamily: "bubblegum-sans",
    fontSize: RFValue(10),
    color: "white",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    paddingLeft: 10,
  },
});
