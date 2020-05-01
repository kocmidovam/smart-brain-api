const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


const db = knex({
  client: 'pg',
  connection: {
    // host : '127.0.0.1', // = localhost
    host : 'postgresql-opaque-69148',
    user : 'postgres',
    password : 'test',
    database : 'smart_brain'
  }
});

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send(db.users)
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', image.handleImage(db)) // jiný styl zápisu - tady nepotřebujeme req, res, ale přididáme je do image.js

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

const PORT = process.env.PORT
app.listen(PORT || 8080, () => {
  console.log(`app is running on port ${PORT}`)
})
