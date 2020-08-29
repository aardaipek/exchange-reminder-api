const auth = require("firebase/auth");
const firebase = require("../firebase.js");


getCurrentUserData = async () => {
  await firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
    }
  });
};

createUser = async (createObject) => {
  const userEmail = createObject.email;
  const userPassword = createObject.password;
  await firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, userPassword)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
};

login = async (loginObject) => {
  const userEmail = loginObject.email;
  const userPassword = loginObject.password;
  await firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPassword)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
};

signOut = async () => {
  await firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
    })
    .catch(function (error) {
      // An error happened.
    });
};

getUserProfile = async () => {
  var user = await firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }
};

updateUserData = async (updateObject) => {
  var user = await firebase.auth().currentUser;
  if (updateObject) {
    user
      .updateProfile({
        displayName: "Jane Q. User",
        photoURL: "https://example.com/jane-q-user/profile.jpg",
      })
      .then(function () {
        // Update successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  } else {
    return "Update fail, Object not found";
  }
};

changeUserMail = async (newMail) => {
  var user = await firebase.auth().currentUser;

  user
    .updateEmail(newMail)
    .then(function () {})
    .catch(function (error) {});
};

sendVerificationMail = async () => {
  var user = await firebase.auth().currentUser;

  user
    .sendEmailVerification()
    .then(function () {
      // Email sent.
    })
    .catch(function (error) {
      // An error happened.
    });
};

sendPasswordResetMail = async (userMail) => {
  var auth = await firebase.auth();
  const emailAddress = userMail;

  auth
    .sendPasswordResetEmail(emailAddress)
    .then(function () {
      // Email sent.
    })
    .catch(function (error) {
      // An error happened.
    });
};

exports.createUser = createUser;
