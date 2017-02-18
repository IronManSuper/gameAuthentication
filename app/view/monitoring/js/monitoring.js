/**
 * Created by Administrator on 2017/1/16.
 */
angular.module('myApp')
.controller('monitoringCtrl',['$scope','$state','$location',function($scope,$state,$location){
    var mPath=$location.path();
    console.log(mPath)
}]);