(function () {

    'use strict';

    angular.module('excelWireless').factory('GlobalVariable',global)

    global.inject = [];

     function global() {

         var globalVar = {};

         globalVar.product='';
         return globalVar;
     }



})();