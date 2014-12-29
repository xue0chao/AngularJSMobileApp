angular.module('main', [
  "ngRoute",
  "mobile-angular-ui",
  "main.auth"
])

.config(function ($routeProvider, $httpProvider) {

  $routeProvider
  .when('/welcome', {
    templateUrl: "components/signin/welcome.html",
    controller: "AuthController"
  })
  .when('/payments', {
    templateUrl: "components/main/payments.html",
    controller: "MainController",
    authenticate: true
  })
  .when('/about', {
    templateUrl: "components/main/about.html",
    controller: "MainController",
    authenticate: true
  })
  .otherwise({
    redirectTo: '/about'
  }); 

  $httpProvider.interceptors.push('AttachHeader');

})

.factory('AttachHeader', function(){

  return {
    request: function (object) {
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    },
    response: function (object) {
      object.headers['Access-Control-Allow-Origin'] = '*';
      return object;
    }
  };

})

.run(function ($rootScope, $location, Auth) {

  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/welcome');
    }
  });

});