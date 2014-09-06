'use strict';

/**
 * @ngdoc function
 * @name angularWebposApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularWebposApp
 */
angular.module('angularWebposApp')
  .controller('MainController', function ($scope,$location) {
      $scope.enter_product=function(){
            $location.path('/Product_list');
        };
      Get_total();
      $scope.num=localStorage.getItem('total');
      $scope.enter_shopcat=function(){
          $location.path('/Shopping_cat');
      }
  });
