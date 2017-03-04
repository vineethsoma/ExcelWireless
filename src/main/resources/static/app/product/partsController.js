(function () {

    'use strict';

    angular.module('excelWireless').controller('PartsController', getPartsProduct);

    getPartsProduct.inject = ['GlobalVariable', 'StoreService', '$state', 'AppState', '$rootScope','$log'];

    function getPartsProduct(GlobalVariable, StoreService, $state, AppState,$rootScope,$log) {

        var vm = this;

        vm.productDto = {};
        vm.barLimit = 5;
        vm.showDIV = false;

        vm.brandAndModelDetails = [];
        vm.brandAndModelDetails =  GlobalVariable.brandModelDto;

        //console.log(brandAndModelDetails);
        $log.info("WebBrandArray" + GlobalVariable.brandModelDto);

        vm.toggle = function()
        {
            vm.showDIV = !vm.showDIV;
        }
        vm.increaseLimit = function()
        {
            vm.barLimit +=5;
        }
        vm.isValidUser = function () {
            vm.user =  sessionStorage.validUser;
            console.log("is valid user"+ vm.user);
        }

        vm.getProductDetails = function (product) {
            // Set the selected product;
            // AppState.state.selectProduct = product || {};
            GlobalVariable.productDetails = product;
            $state.go('productDetails');
        }

        var a = [];
        //getting no of products count as well as the product details and storing in to session to show on the order page.
        vm.updateCartCountParts = function(value, product)
        {
            console.log("Product details from product to product details"+product.description);
            product.saleQuantity = value;
            a.push(product);

            sessionStorage.orderDetails = JSON.stringify(a);
            $rootScope.$emit('updateCount',value);
        }

        vm.isValidUser = function () {
            vm.user =  sessionStorage.validUser;
            console.log("is valid user"+ vm.user);
        }
        function renderData()
        {


            StoreService.getData(GlobalVariable.URLCONSTANT+'getProductsByCategory?category_Id=6').then(
                function (success) {
                    // console.log(success.data)

                    vm.productDto= success.data;

                },
                function (error) {
                    console.log("getReplenishmentInfo call failed");
                });
        }
        function render()
        {
            vm.isValidUser();
            renderData();

        }
        render();
    }

})();