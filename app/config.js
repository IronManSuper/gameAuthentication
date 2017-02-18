/**
 * Created by Administrator on 2017/1/15.
 */
angular.module('myApp')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('home', {
            url:'/home',
            templateUrl: './view/index/index.html'
        }).state('monitoring',{
           url:'/monitoring',
           templateUrl:'./view/monitoring/monitoring.html'
        }).state('loginAndRegister',{
            url:'/loginAndRegister',
            templateUrl:'view/loginAndRegister/loginAndRegister.html',
            controller:'loginCtrl'
        }).state('monitoring.Process',{
            url:'/Process',
            templateUrl:'./view/monitoring-child/Process.html'
        }).state('monitoring.guide',{
            url:'/guide',
            templateUrl:'./view/monitoring-child/guide.html'
        }).state('monitoring.query',{
            url:'/query',
            templateUrl:'./view/monitoring-child/query.html'
        }).state('monitoring.serve',{
            url:'/serve',
            templateUrl:'./view/monitoring-child/serve.html'
        }).state('register',{
            url:'/register',
            templateUrl:'view/loginAndRegister/register.html',
            controller:'registerCtrl'
        });
        $urlRouterProvider.otherwise('/home')
    }])
.run(['$state','$rootScope','$sessionStorage',function($state,$rootScope,$sessionStorage){

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        console.log(toState);
        var urlPatch=toState.name;
        $rootScope.user=$sessionStorage.userDate;
        console.log($rootScope.user)
        if(angular.isObject($rootScope.user)&&toState.name=="loginAndRegister"){
            event.preventDefault();
            $state.go("home");
        }
        if(urlPatch==='monitoring'){
            $state.go('monitoring.Process');
        }
    });



}]);