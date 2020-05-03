import * as functions from 'firebase-functions';
import { IUser} from '../../src/app/interfaces/users';
const admin = require('firebase-admin');
const express = require('express');
const app = express();
const cors = require('cors')({
  origin: true
});
app.use(cors);
admin.initializeApp(functions.config().firebase);


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

exports.addUser = functions.https.onRequest((req, res) => {
    const user: IUser = req.body.user;
    const batch = admin.firestore().batch();
    cors(req, res, () => {
      console.log(user, 'user')
      batch.set(admin.firestore().doc(`users`), user);
      batch.commit().then(() => {
        res.status(200).send();
      }, (error: any) => {
        res.status(400).send(error);
      });
    });
});
