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

export default class BookProv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      bookName: "",
      dataSrc: "",
      userId: firebase.auth().currentUser.email,
      req: [],
    };
  }
  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  fetchBooks = () => {
    firebase
      .database()
      .ref("requestedBooks")
      .on("value", (data) => {
        var books = [];
        if (data.val()) {
          Object.keys(data.val()).forEach((key) => {
            books.push({ key: key, value: data.val()[key] });
          });

          this.setState({ req: books });
          console.log(data.val());
        }
      });
  };
  componentDidMount() {
    this.fetchBooks();
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
          {item.value.bookName}
        </Text>
        <Image
          source={{ uri: item.value.imageLink }}
          style={{ width: 50, height: 70, borderRadius: 2 }}
        />
      </TouchableOpacity>
    );
  };

  render() {
    console.log(this.state.req)
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <Text style={styles.title}>Request Books from Other Users </Text>
          
          <FlatList
            data={this.state.req}
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
