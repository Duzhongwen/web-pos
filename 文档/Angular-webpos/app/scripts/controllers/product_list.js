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
        }
  });
