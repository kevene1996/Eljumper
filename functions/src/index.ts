import * as functions from 'firebase-functions';
import { IUser, IDatos } from '../../src/app/interfaces/users';
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
      html: `<html><body>
                  Buenas usuario, para verificar su cuenta debe realizar un pago de<br/>
                  1$ (Tasa: Monitor Dolar) a la cuenta con los siguientes datos<br/>
                  luego responder a este email con un capture de la transaccion y su cuenta <br/>
                  sera activada en un intervalo de 10 a 60 minutos luego de que los datos sean verificados.`
    };
    transporter.sendMail(mailOptions).then(() => {
      res.status(200).send();
    }, (error: any) => {
      console.log(error);
      res.status(400).send(error)
    });
  });
});

exports.userSignIn = functions.https.onRequest((req, res) => {
  const user: IUser = req.body.user;
  const users: any = [];
  cors(req, res, () => {
    console.log(user);
    admin.firestore().collection(`users`)
      .where('email', '==', user.email)
      .where('password', '==', user.password)
      .get().then((snaps: any) => {
        snaps.forEach((snap: any) => {
          users.push({
            id: snap.id,
            ...snap.data()
          })
        })
        console.log(users);
        res.status(200).send(users)
      }, (error: any) => {
        res.status(400).send(error);
      })
  })
})

exports.saveDatos = functions.https.onRequest((req, res) => {
  const dato: IDatos = req.body.dato;
  const batch = admin.firestore().batch();
  cors(req, res, () => {
    batch.set(admin.firestore().doc(`datos/${dato.psid}`), dato);
    batch.commit().then(() => {
      res.status(200).send();
    }, (error: any) => {
      res.status(400).send(error);
    });
  });
});
