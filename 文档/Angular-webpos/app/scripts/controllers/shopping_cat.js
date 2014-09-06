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
        $scope.num =Get_num();
        var refresh=function() {
            $scope.Message = Get_Shop_information();
        };
        refresh();
        $scope.lower=function(name){
            lower_num(name);
            lower_total();
            $scope.num =Get_num();
            refresh();
        };
        $scope.add=function(name){
            add_num(name);
            add_total();
            $scope.num =Get_num();
            refresh();
        }
    });