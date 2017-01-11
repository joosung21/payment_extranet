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
var list = require( "./temp_reservation_data.js")
var list2 = require( "./temp_reservation_data2.js")
var properties = require( "./temp_property_data.js")
var vendors = require( "./temp_vendor_data.js")
var payments = require( "./temp_payment_data.js")
var list = list.getlist()
var list2 = list2.getlist()
var properties = properties.getlist()
var vendors = vendors.getlist()
var payments = payments.getlist()


app.get('/', function (req, res) {
  res.redirect('/po_list')
})
app.get('/po_dashboard', function (req, res) {
  res.render( 'po_dashboard' , {
    pageId: 'po_dashboard'
  })
})
app.get('/po_list', function (req, res) {
  res.render( 'po_list' , {
    list: list,
    properties: properties,
    pageId: 'po_list'
  })
})
app.get('/ps_list', function (req, res) {
  res.render( 'ps_list' , {
    list2: list2,
    properties: properties,
    vendors: vendors,
    pageId: 'ps_list'
  })
})
app.get('/ps_partner', function (req, res) {
  res.render( 'ps_partner' , {
    properties: properties,
    vendors: vendors,
    pageId: 'ps_partner'
  })
})
app.get('/payment_list', function (req, res) {
  res.render( 'payment_list' , {
    properties: properties,
    payments : payments,
    pageId: 'payment_list'
  })
})
app.get('/user_lock', function (req, res) {
  res.render( 'user_lock')
})
app.post('/user_login', function (req, res) {
  res.redirect( '/')
})
app.get('/user_login', function (req, res) {
  res.render( 'user_login')
})

// SERVER LISTNER
app.listen(3000, function () {
  console.log('todolist app listening on port 3000!')
})
