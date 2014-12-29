angular.module('main', [
  "ngRoute",
  "mobile-angular-ui"
])

.config(function($routeProvider, $locationProvider) {

  $routeProvider.when('/', {templateUrl: "components/signin/welcome.html"});
  $routeProvider.when('/main', {templateUrl: "components/main/main.html"});
  $routeProvider.when('/payments', {templateUrl: "components/main/payments.html"}); 
  $routeProvider.when('/about', {templateUrl: "components/main/about.html"}); 

});