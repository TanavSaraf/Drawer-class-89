import AppLoading from "expo-app-loading";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
let customFonts = {
  "bubblegum-sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};
import firebase from "firebase";
import * as Google from "expo-google-app-auth";

export default class Login extends React.Component {
   isUserEqual=(googleUser, firebaseUser)=> {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((firebaseUser) => {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          const credential = firebase
            .auth
            .GoogleAuthProvider.credential(
              googleUser.idToken,googleUser.accessToken
            );

          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential( credential)
            .then((res) => {
              if (res.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref("users/" + res.user.uid)
                  .set({
                    gmail: res.user.email,
                    profilePicture: res.additionalUserInfo.profile.picture,
                    locale: res.additionalUserInfo.profile.locale,
                    firstName: res.additionalUserInfo.profile.given_name,
                    lastName: res.additionalUserInfo.profile.family_name,

                    currentTheme: "dark",
                  })
              
                }
            })
            .catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.email;
              // The credential that was used.
              const credential = firebase.auth.GoogleAuthProvider.credentialFromError(error);
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      });
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '739623127370-e8s07359ki5bkb2jkj25j2sgi6bqs0sk.apps.googleusercontent.com',
        iosClientId:
          "739623127370-k46vclemagj7gvvdedfhlur4js77vji5.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result)
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  render() {
    return (
      <View>
        <SafeAreaView style={ styles.droidSafeArea}/>
        <TouchableOpacity
          onPress={() => {
            this.signInWithGoogleAsync();
          }}
        >
          <Text style={styles.title}>SIGN IN WITH GOOGLE</Text>
        </TouchableOpacity>
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
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  title: {
    fontFamily: "bubblegum-sans",
    fontSize: RFValue(10),
    color: "black",
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    textAlign: "center",
  },
});
