const functions = require('firebase-functions');
var firebase = require('firebase/app');
const express = require('express')
const app = express()
const path = require("path");
const fetch = require('./fetch')
const admin = require('firebase-admin');

var firebaseConfig = {
    apiKey: "AIzaSyAoX82GSx__OLjSyZiPo4Go9XLyiWDcnmY",
    authDomain: "nodepro-3d28b.firebaseapp.com",
    databaseURL: "https://nodepro-3d28b.firebaseio.com",
    projectId: "nodepro-3d28b",
    storageBucket: "nodepro-3d28b.appspot.com",
    messagingSenderId: "495023067732"
   };
   
// Initialize Firebase
admin.initializeApp(functions.config().firebase);

const publicDirectoryPath = path.join(__dirname, '../style')
const viewsPath = path.join(__dirname, '../views')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
console.log(viewsPath)

app.use(express.static(publicDirectoryPath))
console.log(publicDirectoryPath)

// Home Page
app.get('',(req,res)=>{
    res.render('front')
})

// International News

var url_int = 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=f9a38182923546b8be370365f65f8556&limit=7'

app.get('/int',(req,resp)=>{
    fetch(url_int,(error, res) => {
        if (error) {
            return res.send({ error })
        }
        resp.render('index',{
            shownews: res
        })
    }) 
})

// National News

const url_ind = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=f9a38182923546b8be370365f65f8556&limit=7'
app.get('/in',(req,resp)=>{
    fetch(url_ind,(error, res) => {
        if (error) {
            return res.send({ error })
        }
        resp.render('index',{
            shownews: res
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.'
    })
})

exports.app = functions.https.onRequest(app);

app.listen(3000,()=>{
    console.log('Server running on port 3000.')
})




//const functions = require('firebase-functions');
// var firebase = require('firebase/app');
// const express = require('express')
// const app = express()
// const path = require("path");
// const fetch = require('./fetch')
// const admin = require('firebase-admin');

// var firebaseConfig = {
//     apiKey: "AIzaSyAoX82GSx__OLjSyZiPo4Go9XLyiWDcnmY",
//     authDomain: "nodepro-3d28b.firebaseapp.com",
//     databaseURL: "https://nodepro-3d28b.firebaseio.com",
//     projectId: "nodepro-3d28b",
//     storageBucket: "nodepro-3d28b.appspot.com",
//     messagingSenderId: "495023067732"
//    };
   
// // Initialize Firebase
// admin.initializeApp(functions.config().firebase);

// const publicDirectoryPath = path.join(__dirname, '../style')
// const viewsPath = path.join(__dirname, '../views')

// // Setup handlebars engine and views location
// app.set('view engine', 'hbs')
// app.set('views', viewsPath)
// console.log(viewsPath)

// app.use(express.static(publicDirectoryPath))
// console.log(publicDirectoryPath)

// // Home Page
// app.get('',(req,res)=>{
//     res.render('front')
// })

// // International News

// var url_int = 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=f9a38182923546b8be370365f65f8556&limit=7'

// app.get('/int',(req,resp)=>{
//     fetch(url_int,(error, res) => {
//         if (error) {
//             return res.send({ error })
//         }
//         resp.render('index',{
//             shownews: res
//         })
//     }) 
// })

// // National News

// const url_ind = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=f9a38182923546b8be370365f65f8556&limit=7'
// app.get('/in',(req,resp)=>{
//     fetch(url_ind,(error, res) => {
//         if (error) {
//             return res.send({ error })
//         }
//         resp.render('index',{
//             shownews: res
//         })
//     })
// })

// app.get('*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         errorMessage: 'Page not found.'
//     })
// })

// exports.app = functions.https.onRequest(app);

// app.listen(3000,()=>{
//     console.log('Server running on port 3000.')
// })
