import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import express from 'express';

const firebaseConfig = {
    apiKey: "AIzaSyANX_kUP7tzvQiAnCtys3TpOtfU0Zaogq8",
    authDomain: "login-e776b.firebaseapp.com",
    projectId: "login-e776b",
    storageBucket: "login-e776b.appspot.com",
    messagingSenderId: "434545818081",
    appId: "1:434545818081:web:7771b1cd9e1bfc05a17aa0"
  };

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

const docRef = doc(db, "users", "doc_users");
const docSnap = await getDoc(docRef);
var user;
var passwd; 

try { 
    if (docSnap.exists()) {
        var obj = JSON.stringify(docSnap.data());
        obj = JSON.parse(obj); 
        user = obj.nome;
        passwd = obj.passwd;  
    }
} catch (e) {
    console.error("Error adding document: ", e);
} 


const app = express();

//Rota principal
app.get("/", function(req, res) {
    res.send('Bem-Vindos!!!');
});


//rota login
app.get("/login", function(req, res) {
    res.send('user:' + user + ' passwd:' + passwd);
});

app.listen(3000, () => {
   console.log('iniciando servidor');
});
