(function() {
    angular.module('sampleApp')
        .factory("productDetailsService", productDetailsService);

    productDetailsService.$inject = ['dataService'];

    function productDetailsService(dataService) {
        var vm = this;
        vm.genericService = dataService;
        vm.productDetailsEndpoint = "/getProductsByCategory?category_Id=";

        /**
         * getProductByCategoryId
         * @param catId
         */
        function getProductByCategory(catId) {
            var path = vm.productDetailsEndpoint + catId;
            return vm.genericService.callGenericMethod(path,'GET', {});
        }

        return {
           getProdByCatId: getProductByCategory
        }
    }
}());