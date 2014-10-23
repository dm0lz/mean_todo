var morgan         = require('morgan'); 
var bodyParser     = require('body-parser'); 
var methodOverride = require('method-override'); 

module.exports = function(app){
  app.use(morgan('dev')); 
  app.use(bodyParser.urlencoded({'extended':'true'})); 
  app.use(bodyParser.json({ type: 'application/json' })); 
  app.use(methodOverride());
};