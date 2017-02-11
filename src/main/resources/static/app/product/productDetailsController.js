(function() {
    angular.module('excelWireless')
        .controller('ProductDetailsController', productDetailsController);

    productDetailsController.$inject = ['GlobalVariable']


    // function productDetailsController(AppState) {
    //     var vm = this;
    //     vm.appState = AppState.state || {};
    //     vm.selectedProduct = vm.appState.selectedProduct || {};
    //
    //     vm.getProductDetails = function() {
    //       if (vm.selectedProduct  &&
    //           vm.selectedProduct.description &&
    //             vm.selectedProduct.retailPrice) {
    //           return vm.selectedProduct;
    //       }
    //     };
    // }

    function  productDetailsController(GlobalVariable) {

        var vm = this;
        vm.a = {};

        vm.a = GlobalVariable.productDetails;
    }

}());