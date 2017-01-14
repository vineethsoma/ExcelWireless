'use strict';

angular.module('excelWireless').
    factory('genericService',dataService);

dataService.inject = ['$http','$scope'];

function dataService($http,$scope) {

    var menuDetails = {};

    $scope.getWebMenu = function () {

        $http.get("http://localhost:8080/getWebMenu").
            then(response)
        {
            menuDetails = response.data;

            console.log("This is Alok" + menuDetails)
        }

    }


}