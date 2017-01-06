var express = require('express')
var app = express()
var pug = require('pug')
var bodyParser = require('body-parser')              // Module for Passsing POST data
app.set('views', './views')                         // Init Pug path
app.set('view engine', 'pug')                       // Init framework
app.locals.pretty = true                            // Setting Pug comverting to pretty html
app.locals.moment = require('moment')               // Module for control time format
app.use('/assets', express.static('assets'))        // Init asset path
app.use('/lang', express.static('lang'))        // Init language path
app.use('/', express.static('public'))              // Init static file path
app.use(bodyParser.urlencoded({ extended: false })) // Set bodyParser
app.use(bodyParser.json())                          // Set bodyParser json

// 임시 판매데이타 불러오기
var list = require( "./temp_data.js")
var list = list.getlist()

// ENTRY OF Index
app.get('/', function (req, res) {
  console.log(list)
  res.render('index', {
    list: list
  })
})

// SERVER LISTNER
app.listen(3000, function () {
  console.log('todolist app listening on port 3000!')
})
