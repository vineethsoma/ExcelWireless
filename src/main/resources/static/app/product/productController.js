(function () {

    'use strict';

    angular.module('excelWireless').controller('ProductController',getProduct);

    getProduct.inject = ['GlobalVariable','StoreService'];

    function getProduct(GlobalVariable,StoreService) {

        var vm = this;

        vm.product = {};

            vm.product = GlobalVariable.product;
    }

})();