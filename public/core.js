var SocketIo = angular.module("socket-io", []);

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

}]);



