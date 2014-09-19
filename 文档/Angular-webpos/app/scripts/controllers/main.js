'use strict';

/**
 * @ngdoc function
 * @name angularWebposApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularWebposApp
 */
angular.module('angularWebposApp')
  .controller('Main_Controller', function ($scope) {
      Get_total();
      $scope.num=localStorage.getItem('total');
  });
