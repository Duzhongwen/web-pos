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
        controller: 'Main_Controller'
      })
      .when('/Product_list', {
        templateUrl: 'views/Product_list.html',
        controller: 'Product_Controller'
      })
      .when('/Shopping_car', {
        templateUrl: 'views/Shopping_car.html',
        controller: 'Shopping_car_Controller'
      })
      .when('/Payment', {
        templateUrl: 'views/Payment.html',
        controller: 'Payment_Controller'
      })
      .otherwise({
        redirectTo: '/main'
      });
  });
