(function () {

    'use strict';

    angular.module('excelWireless').controller('SignUpController', signUp);

    signUp.inject = [];

    function signUp() {

        var vm = this;

        vm.addCustomer = function () {

            var request = {};

            request = {

                "onlyFirstName": vm.firstName,
                "firstName": vm.firstName,
                "lastName": vm.lastName,
                "phoneNo": vm.phoneNumber,
                "email": vm.email,
                // "dateOfBirth": $filter('date')(vm.DOB, "yyyy-MM-dd"),
                // "customerType": vm.custType,
                //"gender": vm.gender,
                "street": vm.street,
                "city": vm.city,
                // "state": vm.state,
                //"country": vm.Country,
                //"zipcode": vm.postalCode,
                "fax": null,
                //"customerCreatedDate": js_yyyy_mm_dd_hh_mm_ss(),
                "balance": 0,
                "taxId": vm.taxId,
                "companyName": vm.companyName

            }

            console.log(request);

        }
    }
}
)();