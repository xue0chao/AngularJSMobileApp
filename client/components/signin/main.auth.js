angular.module('main.auth', [

  ])

.controller('AuthController', function ($scope, Auth, $location) {

  $scope.user = {};
  $scope.message = '';
  $scope.signinFormError = false;
  $scope.signin = function() {
    Auth.signin($scope.user)
    .then(function(result) {
      if (result.success) {
        $location.path('/about');
      } else {
        $scope.signinFormError = true;
        $scope.message = result.message;
      }
    });
  };

})

.factory('Auth', function ($http) {

  var authenticated = false;

  return {
    signin: function (user) {
      return $http({
        method: 'POST',
        url: 'http://t001-005-001-02a.elasticbeanstalk.com/api',
        data: user
      })
      .then(function(result){
        if (result.success) authenticated = true;
        return result;
      });
    },
    isAuth: function () {
      return authenticated;
    }
  };

});