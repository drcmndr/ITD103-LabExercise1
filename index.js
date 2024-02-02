
const express = require('express')
const mongoose = require('mongoose')
const UserModel = require('./users');


const app = express()
const port = 3000

app.use (express.json())

mongoose.connect('mongodb://127.0.0.1/malawanidb', {
useNewUrlParser: true,
useUnifiedTopology: true
})

.then(db => console.log ('DB is connected'))
.catch(err => console.log(err))
  
app.get('/', (req, res) => { // displays data from db
  UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/get/:id', (req, res) => { // displays specific user using userID as parameter
  const id = req.params.id
  UserModel.findById({ _id: id})
    .then(post => res.json(post))
    .catch(err => console.log(err))
})

app.post('/create', (req, res) => { // create user profile using Postman and store it on db
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => { // updates a specific user profile in Postman using userID as parameter
  const id = req.params.id;
  UserModel.findByIdAndUpdate({_id: id}, {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  }).then(users => res.json(users))
      .catch(err => res.json(err))
})

app.delete('/deleteuser/:id', (req, res) => { // deletes a specific user using UserID as parameter
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id})
    .then(post => res.json(post))
    .catch(err => console.log(err))
})

app.get('/search/:name', (req, res) => { // searches for users by their name
  const nameSearch = new RegExp(req.params.name, 'i');
  UserModel.find({ name: nameSearch })
    .then(users => res.json(users))
    .catch(err => res.json(err));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})