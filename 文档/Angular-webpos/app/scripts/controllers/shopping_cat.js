/**
 * Created by duzhongwen on 14-9-6.
 */
angular.module('angularWebposApp')
    .controller('Shoppingcat_Controller', function ($scope, $location) {
        $scope.enter_product=function(){
            $location.path('/Product_list');
        };
        $scope.enter_main=function(){
          $location.path('/main');
        };

    });