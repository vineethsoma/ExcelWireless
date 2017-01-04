(function() {
    angular.module('sampleApp')
        .factory("productDetailsService", productDetailsService);

    productDetailsService.$inject = ['dataService'];

    function productDetailsService(dataService) {
        var vm = this;
        vm.genericService = dataService;
        vm.productDetailsEndpoint = "/getProductByCategory?category=";

        /**
         * getProductByCategoryId
         * @param catId
         */
        function getProductByCategory(catId) {
            return vm.dataService.callGenericMethod(vm.productDetailsEndpoint + catId ,'GET', {});
        }

        return {
           getProdByCatId: getProductByCategory

        }
    }
}());