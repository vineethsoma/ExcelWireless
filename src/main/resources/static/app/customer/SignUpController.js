(function () {

    'use strict';

    angular.module('excelWireless').controller('SignUpController', signUp);

    signUp.inject = ['StoreService'];

    function signUp(StoreService) {

        var vm = this;

        vm.addCustomer = function () {

            var request = {};

            request = {
                "onlyFirstName": vm.firstName,
                "firstName":vm.firstName,
                "lastName": vm.lastName,
                "phoneNo": vm.phoneNumber,
                "email": vm.email,
                //"dateOfBirth": $filter('date')(vm.DOB, "yyyy-MM-dd"),dateOfBirth
                "customerType": vm.customerType,
                "gender": vm.gender,
                "street": vm.street,
                "city": vm.city,
                "state": vm.state,
                "country": vm.country,
                "zipcode": vm.zipCode,
                "fax": null,
               // "customerCreatedDate": js_yyyy_mm_dd_hh_mm_ss(),
                "balance": 0,
                "taxId":vm.taxId,
                "companyName":vm.companyName
            };

            request = JSON.stringify(request);
            StoreService.postData("http://localhost:8080/addCustomer", request,"application/json", "application/json").
                then(   function (success) {
                    console.log(success.data)
                    //$state.go('products');
                },
                function (error) {
                    console.log("Not able to add customer");
                });
            console.log(request);

        }
    }
}
)();