import * as functions from 'firebase-functions';
import { IUser } from '../../src/app/interfaces/users';
const admin = require('firebase-admin');
const express = require('express');
const app = express();
const cors = require('cors')({
  origin: true
});
app.use(cors);
admin.initializeApp(functions.config().firebase);
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kevbousader@gmail.com',
    pass: 'kevene96'
  }
});


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

exports.addUser = functions.https.onRequest((req, res) => {
  const user: IUser = req.body.user;
  const batch = admin.firestore().batch();
  cors(req, res, () => {
    batch.set(admin.firestore().doc(`users/${user.id}`), user);
    batch.commit().then(() => {
      res.status(200).send();
    }, (error: any) => {
      res.status(400).send(error);
    });
  });
});

exports.sendEmailtoUser = functions.https.onRequest((req, res) => {
  const email = req.body.email;
  console.log(email, 'email');
  cors(req, res, () => {
    const mailOptions = {
      to: email,
      from: 'Eljumper soporte <kevenebou@hotmail.com>',
      subject: 'Registro de usuario',
      text: 'Buenas usuario, para verificar su cuenta debe realizar un pago de 1$ (Tasa: Monitor Dolar) a la cuenta con los siguientes datos, luego responder a este email con un capture de la transaccion y su cuenta sera activada en un intervalo de 10 a 60 minutos luego de que los datos sean verificados.'

    };
    transporter.sendMail(mailOptions).then(() => {
      res.status(200).send();
    }, (error: any) => {
      console.log(error);
      res.status(400).send(error)
    });
  });
});
