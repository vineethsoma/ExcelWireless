'use strict';

angular.module('excelWireless', []).factory('commonFactory', commonFactoryFunction);

commonFactoryFunction.inject = ['$scope','$http'];

function commonFactoryFunction($scope,$http) {

    $scope.addCustomer()
}

