(function() {
    angular.module('sampleApp')
        .factory('mockData', mockData);

    function mockData() {
        var service = {};

        return service;
    }
}());