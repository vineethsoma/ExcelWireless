(function () {

    'use strict';

    angular.module('excelWireless').controller('OrderController', getProduct);

    getProduct.$inject = ['$scope','$rootScope','GlobalVariable', 'StoreService', '$state', 'AppState','RestrictedCharacter.Types'];

    function getProduct($scope,$rootScope,GlobalVariable, StoreService, $state, AppState,restrictCharacter) {

        var vm = this;
        vm.orderDto = {};
        var c =0;
        vm.total = 0;
        vm.totalQuantity = 0;
        $scope.restrictCharacter = restrictCharacter;


        // vm.orderDto1 = JSON.parse(sessionStorage.orderDetails);
        vm.test1 = function(value)
        {
            if(value != undefined && value != null && value != '')
            vm.getTotalValue();
        }

        vm.getOrderDetails = function () {

            StoreService.getData(GlobalVariable.URLCONSTANT + "getTransactionLineItem?phoneNo="+sessionStorage.customerPhoneNo).then(
                function (success) {
                    vm.orderDto = success.data;
                    vm.getTotalValue();
                },
                function (error) {
                    console.log("Failed to get customers order details");
                });
            //vm.orderDto = JSON.parse(sessionStorage.orderDetails);
        }
        vm.removeProduct = function(productNo,index)
        {
            StoreService.postData(GlobalVariable.URLCONSTANT+"deleteTransactionLineItem?phoneNo="+sessionStorage.customerPhoneNo+"&productNo="+productNo).then(
                function (success) {
                    console.log("Removed product successfully");
                    vm.orderDto.splice(index, 1);
                },
                function (error) {
                    console.log("Failed to remove product from order");
                });
        }
        vm.updateProductQuantity = function(productQuantity,productNo)
        {
            StoreService.postData(GlobalVariable.URLCONSTANT+"updateTransactionLineItem?phoneNo="+sessionStorage.customerPhoneNo+"&productNo="+productNo+"&quantity="+productQuantity).then(
                function (success) {
                    console.log("Updated product successfully");
                },
                function (error) {
                    console.log("Failed to update product from order");
                });
        }
        vm.continueOrder = function () {

            $state.go('checkout');
        }
        vm.getTotalValue = function()
        {

            for(var i=0;i<vm.orderDto.length;i++)
            {
                vm.total = vm.total + (parseFloat(vm.orderDto[i].retailPrice) * parseInt(vm.orderDto[i].quantity));
                vm.totalQuantity = vm.totalQuantity + parseInt(vm.orderDto[i].quantity);
            }
        }
        function render()
        {

            vm.getOrderDetails();

        }
        render();
    }



})();