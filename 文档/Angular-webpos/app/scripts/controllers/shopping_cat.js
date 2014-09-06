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
        var refresh=function() {
            $scope.Message = Get_Shop_information();
            $scope.num =Get_num();
            $scope.all=get_all();
            $scope.free=get_free();
        };
        refresh();
        $scope.lower=function(name){
            lower_num(name);
            lower_total();
            get_discounts();
            refresh();
        };
        $scope.add=function(name){
            add_num(name);
            add_total();
            get_discounts();
            refresh();
        }
    });