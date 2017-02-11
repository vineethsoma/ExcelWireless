(function () {

    'use strict';

    angular.module('excelWireless').factory('GlobalVariable',global)

    global.inject = [];

     function global() {

         var globalVar = {};

         globalVar.product='';
         globalVar.prodcutDetails = '';
         globalVar.partsProduct = '';
         globalVar.lineItemDto = '';
         globalVar.productBtCategory = '';
         return globalVar;
     }



})();