var express = require('express')
var app = express()
var pug = require('pug')
var bodyParser = require('body-parser')
app.set('views', './views')
app.set('view engine', 'pug')
app.locals.pretty = true
app.locals.moment = require('moment')
app.use('/assets', express.static('assets'))
app.use('/lang', express.static('lang'))
app.use('/', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Temporary DATA
var list = require( "./temp_data.js")
var list = list.getlist()

// ENTRY OF Index
app.get('/', function (req, res) {
  res.render('index', {
    list: list
  })
})

// SERVER LISTNER
app.listen(3000, function () {
  console.log('todolist app listening on port 3000!')
})
