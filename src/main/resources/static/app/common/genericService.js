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

    vm.postData = function (_url,_reqDate,content_type, accept) {

        var headerObj = {
            Accept : accept
        };
        return $http({
            method:'POST',
            url:_url,
            data:_reqDate,
            headers : headerObj
        });

    }
    return vm;

}