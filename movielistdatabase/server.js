const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

let items = [];
let id = 0;

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;

//Login
app.post('/api/login', (req, res) => {
  console.log(req.body);
  if (!req.body.password)
    return res.status(400).send();
  knex('users').first().then(user => {
    if (user === undefined) {
      res.status(403).send("Invalid credentials");
      throw new Error('abort');
    }
    return [bcrypt.compare(req.body.password, user.hash),user];
  }).spread((result,user) => {
    if (result)
      res.status(200).json({user:{username:user.username,id:user.id}});
    else
      res.status(403).send("Invalid credentials");
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

//Registration
app.post('/api/users', (req, res) => {
  console.log(req.body);
  if (!req.body.password || !req.body.username)
    return res.status(400).send();
  knex('users').first().then(user => {
    if (user !== undefined) {
      res.status(403).send("Email address already exists");
      throw new Error('abort');
    }
    return knex('users').where('username',req.body.username).first();
  }).then(user => {
    if (user !== undefined) {
      res.status(409).send("User name already exists");
      throw new Error('abort');
    }
    return bcrypt.hash(req.body.password, saltRounds);
  }).then(hash => {
    return knex('users').insert({hash: hash, username:req.body.username});
  }).then(ids => {
    return knex('users').where('id',ids[0]).first().select('username','id');
  }).then(user => {
    res.status(200).json({user:user});
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

// getItems
app.get('/api/users/:id/movies', (req, res) => {
  console.log("get");
  let userid = parseInt(req.params.id);
  console.log(userid);
  knex('users').join('movies','users.id','movies.user_id')
    .where('users.id',userid)
    .orderBy('created','asc')
    .select('movies.id','title','poster','completed').then(movies => {
      console.log(movies);
      res.status(200).json({movies:movies});
    }).catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
});

app.post('/api/users/:id/movies', (req, res) => {
  console.log("post");
  console.log(req.body);
  // let item = req.body;
  let userid = parseInt(req.params.id);
  knex('users').where('id',id).first().then(user => {
    return knex('movies').insert({user_id: userid, title: req.body.title, poster: req.body.poster, created: new Date(), completed: "not seen"});
  }).then(ids => {
    return knex('movies').where('id',ids[0]).first();
  }).then(item => {
    res.status(200).json({item:item});
    return;
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

//complete
app.put('/api/movies/:id', (req, res) => {
  console.log("complete");
  let movieid = parseInt(req.params.id);
  // console.log(movieid);
  let seen = req.body.completed;
  console.log(req.body.completed);
  knex('movies').where('id',movieid).update({completed: seen}
  ).then(item => {
    console.log("here");
    res.status(200).json({item:item});
    return;
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});


app.delete('/api/movies/:id', (req, res) => {
  console.log("complete");
  let movieid = parseInt(req.params.id);
  // console.log(movieid);
  knex('movies').where('id',movieid).delete().then(item => {
    console.log("here");
    res.status(200).json({item:item});
    return;
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

app.listen(3000, () => console.log('Server listening on port 3000!'))
