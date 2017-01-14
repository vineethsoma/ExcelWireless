'use strict'
var app = angular.module('excelWireless', ['ui.router', 'ui.bootstrap']);

app.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('login',{
            url:'/login',
            templateUrl:'app/login/login.html',
            controller:'loginController'
        })
        .state('home',{
            url:'/home',
            templateUrl:'app/home/home.html',
            controller:'homeController'
        })

        .state('contactUs',{
            url:'/contactUs',
            templateUrl:"app/contactUs/contactUs.html",
            controller:'contactUsController'
        })

        .state('lcdBuyback',{
            url:'/lcdBuyback',
            templateUrl:'app/lcdBuyback.html',
        })

        .state('signUp',{
            url:"/signUp",
            templateUrl:"app/signUp.html"
        });

}]);