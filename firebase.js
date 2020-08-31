// Firebase
// const firebase = require("firebase/app");
// const database = require("firebase/database");
// const firebaseConfig = require("./firebaseConfig");
// firebase.initializeApp(firebaseConfig.config);

writeUserData = (data) => {
  try {
    firebase.database().ref("rates/").set({
      user_name: data.user_name,
      user_rate: data.user_rate,
      exchange_type: data.exchange_type,
    });
  } catch (err) {}
};

getData = () => {
  try {
    firebase
      .database()
      .ref("rates/")
      .once("value")
      .then(function (snapshot) {
        var username = snapshot.val() && snapshot.val().user_name;
        console.log(username);
        return username;
      });
  } catch (err) {
    return err;
  }
};

