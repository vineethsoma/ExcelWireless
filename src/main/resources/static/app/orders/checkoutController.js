(function () {

    'use strict';

    angular.module('excelWireless').controller('CheckoutController', productCheckout);

    productCheckout.inject = ['$scope','$rootScope','GlobalVariable', 'StoreService', '$state', 'AppState'];

    function productCheckout($scope,$rootScope,GlobalVariable, StoreService, $state, AppState) {

        var vm = this;
        vm.orderDto = {};

        vm.phoneNo = sessionStorage.customerPhoneNo;
        vm.street = sessionStorage.street;
        vm.city = sessionStorage.city;
        vm.state = sessionStorage.state;
        vm.country = sessionStorage.country;
        vm.zipcode = sessionStorage.zipcode;
        vm.fax = sessionStorage.fax;
        vm.email = sessionStorage.email;
        vm.firstName = sessionStorage.firstName;
        vm.lastName = sessionStorage.lastName;
        vm.companyName = sessionStorage.companyName;


        vm.removeProduct = function (productNo, index) {
            StoreService.postData(GlobalVariable.URLCONSTANT + "deleteTransactionLineItem?phoneNo=" + sessionStorage.customerPhoneNo + "&productNo=" + productNo).then(
                function (success) {
                    console.log("Removed product successfully");
                    vm.orderDto.splice(index, 1);
                },
                function (error) {
                    console.log("Failed to remove product from order");
                })
            function render() {

                vm.getOrderDetails();
            }

            render();
        }


    }
})();