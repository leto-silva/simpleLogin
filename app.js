import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import express from 'express';
import path from 'path';
import bodyParser  from 'body-parser';
import { request } from 'https';

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
const __dirname = path.resolve();
app.use(bodyParser.urlencoded({extended: false}));

//Rota principal
app.get("/", function(req, res) {
    //res.send('Bem-Vindos!!!');
    res.sendFile(path.join(__dirname, 'login.html'));
});



app.post("/login", function(req, res) {
   
    try {
      
        if (req.body.username == user 
           &&  req.body.password == passwd){

            res.redirect('https://webpetshop.herokuapp.com')
       }
       else {
           res.send('Erro usuário e senha!');

       }


   } catch (e) {
      res.send("Internal server error", e);
           
      
   }
    
});



app.listen(3000, () => {
   console.log('iniciando servidor');
});
