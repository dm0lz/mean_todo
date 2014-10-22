// set up ========================
var express        = require('express');
var app            = express(); // create our app w/ express
var mongoose       = require('mongoose'); // mongoose for mongodb
var morgan         = require('morgan'); // log requests to the console (express4)
var bodyParser     = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // setimulate DELETE and PUT (express4)

require('locus');

// configuration =================
mongoose.connect('mongodb://localhost:27017/socket-io'); // connect to mongoDB database on modulus.io
app.use(express.static(__dirname + '/public')); // set the static files location /pullublic/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ type: 'application/json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Define Models
var Todo = mongoose.model('Todo', {
  text : String
});

//get all todos
app.get('/api/todos', function(req, res) {
  //todos use mongoose to get all todos in the database
  Todo.find(function(err, todos) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err)
    res.json(todos); // return all todos in JSON format
  });
});

// create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {
  // create a todo, information comes from AJAX     request from Angular
  //eval(locus);
  Todo.create({
    text : req.body.text
  }, function(err, todo) {
    if (err)
      res.send(err);
    //req get and return all the todos after you create another
    Todo.find(function(err, todos) {
      if (err)
        res.send(err)
      res.json(todos);
    });
  });
});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
  //eval(locus);
  Todo.remove({
    _id : req.params.todo_id
  }, function(err, todo) {
    if (err)
      res.send(err);
    // get and                    return all the todos after you create another
    Todo.find(function(err, todos) {
      if (err)
        res.send(err)
      res.json(todos);
    });
  });
});

app.get('*', function(req, res) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js)
app.listen(3000);
console.log("App listening on port 3000");

