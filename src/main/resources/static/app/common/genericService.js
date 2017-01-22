angular.module('excelWireless')
    .factory('StoreService', StoreService);

StoreService.$inject = [ '$http'];


function StoreService($http){
    var vm = {};
    vm.getData = function (_url){

        return $http({
            method: 'GET',
            url: _url,
            cache: false
        });

    };
    return vm;

}