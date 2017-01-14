(function () {
    'use strict';

    angular.module('excelWireless').controller('loginController', loginFunction);

    loginFunction.$inject = ['$scope', '$http'];

    function loginFunction($scope, $http) {

        $scope.onLoginClicked = function ($event) {
            var userDetail;

            var username = $scope.username;
            var password = $scope.password;

            console.log(username);
            console.log(password);

            $http.get('http://localhost:8080/getUserLoginDetails?username=' + username + '&password=' + password).then(function (response) {

                userDetail = response.data;

                console.info(userDetail)

            });
        }
    };
}());
