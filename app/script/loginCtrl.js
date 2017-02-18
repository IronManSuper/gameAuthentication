/**
 * Created by Administrator on 2017/1/18.
 */
angular.module('myApp')
    .factory('validateFactory', [function () {
        var validate = '';
        var codeLength = 4;

        return {
            getValidate: function () {
                //验证码的长度
                validate = '';
                var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
                for (var i = 0; i < codeLength; i++) {
                    var charNum = Math.floor(Math.random() * 52);
                    validate += codeChars[charNum];
                }
                return validate;
            }
        }


    }])
   .factory('TipService',['$timeout',function($timeout){
       return{
           message:null,
           type:null,
           setMessage:function(msg,type){
               this.message=msg;
               this.type=type;
               var _self=this;
               $timeout(function(){
                   _self.clear();
               },3000);
           },
           clear:function(){
               this.message=null;
               this.type=null;
           }
       }
   }])
   .service('loginService', ['$http', '$q','md5', function ($http, $q,md5) {
       console.log('进入服务');
        this.subUser = function (user) {
            console.log('进入服务2');
            var password=md5.createHash(user.password);
            console.log('进入服务3');
            return $http({
                method: 'POST',
                url: 'http://115.29.248.98:8090/account/login',
                params: {'phone':user.phone,'password':password}
            }).then(function(d){
                console.log('进入服务4');
                return $q.when(d);
            },function(d){
                console.log(d);
                return $q.reject(d);
            });
        }
    }])
    .controller('loginCtrl', ['$scope', 'validateFactory', 'loginService','$location','TipService','$timeout','$sessionStorage',
        function ($scope, validateFactory, loginService,$location,TipService,$timeout,$sessionStorage) {
        $scope.validate = validateFactory.getValidate();
        $scope.user = {};

        $scope.getValidate = function () {
            $scope.validate = validateFactory.getValidate();
        };
        $scope.tipService=TipService;
        $scope.submitUser = function (isValid) {
            if(isValid){
                console.log('进去登录2');
                loginService.subUser($scope.user).then(function(res){
                    var resouce=res.data;
                    console.log('进去登录');
                    if(angular.isObject(resouce.data)){
                        console.log('进去登录');
                        $sessionStorage.userDate=resouce.data;
                        TipService.setMessage(resouce.message,'success');
                        $timeout(function(){
                            $location.path('/home').replace();
                        },1000);

                    }else{
                        TipService.setMessage(resouce.message,'danger');
                        $scope.validate=validateFactory.getValidate();
                        $scope.user.password='';
                        $scope.user.validCode='';
                    }
                },function (res) {
                    console.log(res);
                    $scope.user = {};
                });
            }
        };
    }]);
