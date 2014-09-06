'use strict';

/**
 * @ngdoc function
 * @name angularWebposApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularWebposApp
 */
angular.module('angularWebposApp')
  .controller('Product_Controller', function ($scope, $location) {
        $scope.enter_main=function(){
            $location.path('/main');
        };
        $scope.enter_shopcat=function(){
            $location.path('/Shopping_cat');
        };
        $scope.num =Get_num();
        $scope.lists=Item();
        $scope.add_shopcat=function(list){
          var product=new Product_list(list.kind,list.name,list.prices,list.Unit,1);
          product.storage(list.name);
          $scope.num =Get_num();
        };
  });
