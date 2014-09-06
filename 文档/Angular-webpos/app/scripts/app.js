'use strict';

/**
 * @ngdoc overview
 * @name angularWebposApp
 * @description
 * # angularWebposApp
 *
 * Main module of the application.
 */
angular
  .module('angularWebposApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/Product_list', {
        templateUrl: 'views/Product_list.html',
        controller: 'Product_Controller'
      })
      .when('/Shopping_cat', {
        templateUrl: 'views/Shopping_cat.html',
        controller: 'Shoppingcat_Controller'
      })
      .when('/Payment', {
        templateUrl: 'views/Payment.html',
        controller: 'Payment_Controller'
      })
      .otherwise({
        redirectTo: '/main'
      });
  });
