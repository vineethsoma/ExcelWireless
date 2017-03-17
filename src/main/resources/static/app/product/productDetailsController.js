(function() {
    angular.module('excelWireless')
        .controller('ProductDetailsController', productDetailsController);

    productDetailsController.$inject = ['GlobalVariable','$scope','RestrictedCharacter.Types']


    function  productDetailsController(GlobalVariable,restrictCharacter,$scope) {

        var vm = this;
        vm.a = {};

        $scope.restrictCharacter = restrictCharacter;

        vm.a = GlobalVariable.productDetails;

        vm.updateCartCountParts = function (value, product) {
            console.log("Product details from product to product details" + product.description);
            product.quantity = value;
            product.phoneNo = sessionStorage.customerPhoneNo;
            a.push(product);

            sessionStorage.orderDetails = JSON.stringify(a);
            $rootScope.$emit('updateCount', value);

            StoreService.postData(GlobalVariable.URLCONSTANT + "addTransactionLineItem", product, "application/json", "application/json").then(function (response) {
                    var data = response.data;

                    console.log("response data", data);
                },
                function (error) {
                    console.log("getReplenishmentInfo call failed");
                });
        }
    }

}());