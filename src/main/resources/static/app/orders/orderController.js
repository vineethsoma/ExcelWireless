(function () {

    'use strict';

    angular.module('excelWireless').controller('OrderController', getProduct);

    getProduct.inject = ['$scope','$rootScope','GlobalVariable', 'StoreService', '$state', 'AppState'];

    function getProduct($scope,$rootScope,GlobalVariable, StoreService, $state, AppState) {

        var vm = this;
        vm.orderDto = {};

       // vm.orderDto1 = JSON.parse(sessionStorage.orderDetails);

        vm.getOrderDetails = function () {

            vm.orderDto = JSON.parse(sessionStorage.orderDetails);
            // console.log("This is order dto from the orderController"+vm.orderDto);
            // console.log("Image"+ vm.orderDto.image);
            // console.log("Image 2"+sessionStorage.orderDetails.image);
            // console.log("Des" + vm.orderDto.description);
        }

        function render()
        {

            vm.getOrderDetails();
        }
        render();
    }



})();