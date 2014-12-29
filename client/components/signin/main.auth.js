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
        console.log('result is successful')
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
        url: '/proxy',
        data: {
          authServer: 'http://t001-005-001-02a.elasticbeanstalk.com/api',
          user: user
        }
      })
      .then(function(result){
        if (result.data.success) authenticated = true;
        return result.data;
      });
    },
    isAuth: function () {
      return authenticated;
    }
  };

});