// Firebase
const firebase = require("firebase/app");
const database = require("firebase/database");
const auth = require("firebase/auth");
const firebaseConfig = require("./firebaseConfig");

firebase.initializeApp(firebaseConfig.config);

function writeUserData(data) {
  try {
    firebase.database().ref("rates/").set({
      user_name: data.user_name,
      user_rate: data.user_rate,
      exchange_type: data.exchange_type
    });
  } catch (err) {}
}

async function getData() {
  try {
    firebase
      .database()
      .ref("test/")
      .once("value")
      .then(function (snapshot) {
        var username = snapshot.val() && snapshot.val().name;
        console.log(username)
        return username;
      });
  } catch (err) {
    return err;
  }
}

exports.getData = getData;
exports.writeUser = writeUserData;
