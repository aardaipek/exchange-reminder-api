const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
const firebaseConfig = require('./firebaseConfig')

app.use(cors({ origin: true }));

const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault(firebaseConfig)
  });

const db = admin.firestore();

async function setData() {
    const docRef = db.collection('users').doc('alovelace');
    await docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
      });
  }

  async function getData(){
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  }
setData();
getData();
app.get('/test', (req, res) => {
  return res.status(200).send('Hello World!');
});

exports.firebase = functions.https.onRequest(app);