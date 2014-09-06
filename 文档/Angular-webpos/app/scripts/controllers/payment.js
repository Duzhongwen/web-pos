/**
 * Created by duzhongwen on 14-9-6.
 */
angular.module('angularWebposApp')
    .controller('Payment_Controller', function ($scope, $location) {
       $scope.Message = Get_Shop_information();
       $scope.num =Get_num();
       $scope.all=get_all();
       $scope.free=get_free();
       $scope.Messages=get_free_shop();
       $scope.juge=function(num,kind){
          return jugement_show(num,kind);
       };
       $scope.number=get_free_count();
    });