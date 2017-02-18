/**
 * Created by Administrator on 2017/1/18.
 */
angular.module('myApp')
    .service('registerService',['$http','$q','md5',function($http,$q,md5){
        function httpRequest(obj){
            return $http({
                method: obj.method,
                url: obj.url,
                params: obj.wxParams
            }).then(function(d){
                return $q.when(d);
            },function(d){
                return $q.reject(d);
            });
        }
        this.registerUserFn=function(registerUser){
            /*delete registerUser.confirm_password;
            delete registerUser.idNumber;
            delete registerUser.realName;
            delete registerUser.check;*/
            var password=registerUser.password;
            console.log(registerUser);

            password=md5.createHash(password);
            console.log(password);
            var obj={
                method:'POST',
                url:'http://115.29.248.98:8090/account/Register',
                wxParams:{'phone':registerUser.phone,'password':password,'verificationCode':registerUser.verificationCode}
            };
            return httpRequest(obj);
        };

        this.getVerificationCode=function(phone){
            var obj={
                method:'GET',
                url:'http://115.29.248.98:8090/account/GetVerificationCode',
                wxParams:{'phone':phone}
            };
            return httpRequest(obj);
        }
    }])
    .controller('registerCtrl', ['$scope','registerService','TipService','$interval','$timeout','$location', function ($scope,registerService,TipService,$interval,$timeout,$location) {
        $scope.registerUser = {};
        $scope.tipService=TipService;
        $scope.orClick=false;
        $scope.timing='';
        $scope.scode='';
        var time=60;
        $scope.getValidateCode=function(phone){
            $scope.orClick=true;
            var wxInterval=$interval(function(){
               if(time==0){
                    $scope.orClick=false;
                    $scope.timing='';
                    $scope.scode='';
                    time=60;
                    $interval.cancel(wxInterval);
                }else{
                    time--;
                   $scope.timing=time+' s';
                }
            },1000);
            registerService.getVerificationCode(phone).then(function(d){
                TipService.setMessage(d.data.message,'success');
                $scope.scode=d.data.data;
                console.log($scope.scode);
            },function (d) {
                TipService.setMessage(d.data.message,'danger');
            });
        };

        $scope.submitRegisterUer=function(){
            registerService.registerUserFn($scope.registerUser).then(function(d){
                var result=d.data;
                console.log(result);
                if(angular.isObject(result.data)){
                    TipService.setMessage(d.data.message,'success');
                    $timeout(function(){
                        $scope.registerUser = {};
                        $location.path('/loginAndRegister').replace();
                    },1000);

                }else{
                    $scope.registerUser.password='';
                    $scope.registerUser.confirm_password='';
                    $scope.registerUser.realName='';
                    $scope.registerUser.idNumber='';

                    TipService.setMessage(d.data.message,'danger');

                }
            },function (d) {
            })
        }
    }]);