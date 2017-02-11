(function () {

    'use strict';

    angular.module('excelWireless').controller('ProductController', getProduct);

    getProduct.inject = ['$scope','$rootScope','GlobalVariable', 'StoreService', '$state', 'AppState'];

    function getProduct($scope,$rootScope,GlobalVariable, StoreService, $state, AppState) {

        var vm = this;

        vm.productDto = {};

        vm.isValidUser = function () {
            vm.user =  sessionStorage.validUser;
            console.log("is valid user"+ vm.user);
        }

        vm.productDto = GlobalVariable.product;


        vm.getProductDetails = function (product) {
            // Set the selected product;
            GlobalVariable.productDetails = product;
            $state.go('productDetails');
        }
        var a = [];
        //getting no of products count as well as the product details and storing in to session to show on the order page.
        vm.updateCartCount = function(value, product)
        {
            console.log("Product details from product to product details"+product.description);
            product.saleQuantity = value;
            a.push(product);

            sessionStorage.orderDetails = JSON.stringify(a);
            $rootScope.$emit('updateCount',value);
        }

        function render()
        {

            vm.isValidUser();
        }
        render();

    }

})();