var Todo = require("../models/todo.js");
require('locus');

module.exports = function(app){

  app.get('/api/todos', function(req, res) {    
    Todo.find(function(err, todos) {
      if (err)
        res.send(err)
      res.json(todos); 
    });
  });

  app.post('/api/todos', function(req, res) {
    //eval(locus);
    Todo.create({
      text : req.body.text
    }, function(err, todo) {
      if (err)
        res.send(err);
      Todo.find(function(err, todos) {
        if (err)
          res.send(err)
        res.json(todos);
      });
    });
  });

  app.delete('/api/todos/:todo_id', function(req, res) {
    //eval(locus);
    Todo.remove({
      _id : req.params.todo_id
    }, function(err, todo) {
      if (err)
        res.send(err);
      Todo.find(function(err, todos) {
        if (err)
          res.send(err)
        res.json(todos);
      });
    });
  });

  app.put('/api/todos/:todo_id', function(req, res){
    //eval(locus);
    var update_data = {
      text: req.body.text
    };
    Todo.update({_id: req.params.todo_id}, update_data, function(err, affected){
      //console.log(affected);
      res.json({nb_affected: affected});
    });
  });

}