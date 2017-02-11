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
            templateUrl:'app/contactUs/contactUs.html',
            controller:'contactUsController'
        })

        .state('lcdBuyback',{
            url:'/lcdBuyback',
            templateUrl:'app/lcdBuyback.html'
        })

        .state('signUp',{
            url:'/signUp',
            templateUrl:'app/customer/signUp.html'
        })
        .state('products',{
            url:'/products',
            templateUrl:'app/product/products.html'
        })
        .state('productDetails',{
            url:'/productDetails',
            templateUrl:'app/product/productDetails.html'
        })
        .state('addProductImage',{
            url:'/addProductImage',
            templateUrl:'app/product/addProductImage.html'
        })
        .state('order',{
            url:'/order',
            templateUrl:'app/orders/order.html'
        })
        .state('categoryProducts',{
            url:'/categoryProducts',
            templateUrl:'app/product/categoryProducts.html'
        })
        .state('partProducts',{
            url:'/partProducts',
            templateUrl:'app/product/partProducts.html',
            controller :'PartsController as p'
    });

}]);