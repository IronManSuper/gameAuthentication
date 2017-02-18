/**
 * Created by Administrator on 2017/1/18.
 */

angular.module('myApp')
.directive('compare',function(){/*验证码对比*/
    return{
        restrict:'EA',
        scope:{
            orgText:'=compare'
        },
        require:'ngModel',
        link:function(scope,element,attr,ctrl){
            ctrl.$validators.compare=function(v){
                var ov=v?v.toUpperCase():'';
                var oText=scope.orgText.toUpperCase();
                return angular.equals(oText,ov);
            };

            scope.$watch('orgText',function(){
                ctrl.$validate();
            });
        }
    }
}).directive('passwordCompare',function(){/*注册两次密码对比*/
    return{
        restrict:'EA',
        scope:{
          password:"=passwordCompare"
        },
        require:'ngModel',
        link:function (scope,element,attr,ctrl) {
            ctrl.$validators.pwdCompare=function(v){
                return angular.equals(scope.password,v);
            };

            scope.$watch('password',function(){
                ctrl.$validate();
            })
        }
    }
}).directive('codeCompare',function(){/*注册两次密码对比*/
    return{
        restrict:'EA',
        scope:{
            orgCode:"=codeCompare"
        },
        require:'ngModel',
        link:function (scope,element,attr,ctrl) {
            ctrl.$validators.codeCompare=function(v){
                return angular.equals(scope.orgCode,v);
            };

            scope.$watch('orgCode',function(){
                ctrl.$validate();
            })
        }
    }
}).directive('orPhone',['$http','$q',function($http,$q){/*异步验证是否存在手机号*/
    return{
        restrict:'EA',
        require:'ngModel',
        link:function(scope,ele,attr,ctrl){
            ctrl.$asyncValidators.orExist=function(modelValue,viewValue){
                var value = modelValue || viewValue;
                var deferred = $q.defer();
                return $http({
                    method:'GET',
                    url:'http://115.29.248.98:8090/account/HasRegister',
                    params:{'phone':value}
                }).then(function(d){
                    if(d.data=='false'){
                        deferred.reject();
                    }else{
                        deferred.resolve();
                    }
                    return deferred.promise;

                },function(d){
                    return $q.when(true);
                });
            }
        }
    }
}]).directive('alertBar',[function(){/*全局提示框*/
    return{
        restrict:'EA',
        templateUrl:'./view/alertBar/alertBar.html',
        scope:{
            message:'=',
            type:'='
        },
        link:function(scope,element,attr){
            scope.hideAlert = function() {
                scope.message = null;
                scope.type = null;
            };
        }
    }
}]);
