(function () {
    'use strict';

    angular.module('excelWireless').controller('loginController', loginFunction);

    loginFunction.$inject = ['$http', '$state'];

    function loginFunction($http, $state) {

        var vm = this;

        vm.onLoginClicked = function (username,password) {
            var userDetail;
            console.log(username + password)

            $http.get('http://localhost:8080/getUserLoginDetails?username=' + username + '&password=' + password).then(function (response) {

                userDetail = response.data;

                if(userDetail.validUser)
                {
                    sessionStorage.validUser = true;
                    $state.go('home');
                }
                else
                {
                    sessionStorage.validUser = false;
                    console.log("Wrong username or password")
                }

                console.info("Login Response:"+userDetail.username)

            });
        }
    }
}());
