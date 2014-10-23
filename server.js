var express  = require('express');
var app = express();
var mongoose = require('mongoose'); 

var config = require('./config/general.js');
var Todo = require('./models/todo.js');

// Config
mongoose.connect(config.db_url);
app.use(express.static(__dirname + '/public')); 

require('./config/application.js')(app);
require('./controllers/main.js')(app)

// Main route
app.get('*', function(req, res) {
  res.sendfile('./public/index.html'); 
});

app.listen(3000);
console.log("App listening on port 3000");

