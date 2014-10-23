var SocketIo = angular.module("socket-io", ["xeditable"]);

SocketIo.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

SocketIo.controller('MainCtrl', ['$scope', '$http', function($scope, $http){

  $scope.name = "Oli";
  $scope.formData = {};


  $http.get('/api/todos')
    .success(function(data) {
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.createTodo = function() {
    //console.log($scope.formData);
    $http.post('/api/todos', $scope.formData)
    .success(function(data) {
      $scope.formData = {}; 
      $scope.todos = data;
      //console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
    .success(function(data) {
      $scope.todos = data;
      //console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  $scope.updateTodo = function(data, todo_id){
    var data = {
      text: data
    };
    //console.log(data + " | " + todo_id);
    $http.put('/api/todos/' + todo_id, data)
    .success(function(data) {
      //$scope.todos = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

}]);



