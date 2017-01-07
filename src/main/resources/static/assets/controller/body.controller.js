(function () {
    'use strict';

    angular.module('sampleApp').controller('BodyController', Body);

    Body.$inject = ['$scope', '$state', '$window', '$log', '$timeout', 'dataService', 'productDetailsService'];

    function Body($scope, $state, $window, $log, $timeout, dataService, productDetailsService) {

        var vm = this;
        vm.showMenu = false;
        vm.showSubmenu = false;
        vm.service = dataService;
        vm.categoryList = [];
        vm.brandList = [];
        vm.dataList = [];
        vm.responseData = {};
        vm.productMethods = productDetailsService;

        vm.setDataList = function (name) {
            vm.dataList = [];
            if (name === 'category') {
                vm.categoryList.forEach(function (item, index) {
                    vm.dataList.push({"id": item.categoryId, "name": item.categoryName});
                });
            } else if (name === 'brand') {
                vm.brandList.forEach(function (item, index) {
                    vm.dataList.push({ "id": item.brandId, "name": item.brandName, "modelList": item.modelDtoList })
                });
            }
        };


        /**
         * What happens when a user hovers over tab.
         * @param isHover
         */
        vm.setHover = function (isHover) {
            vm.showMenu = isHover;
        };

        /**
         * What happens when a user mouse leaves a tab with a submenu.
         * @param event
         */
        vm.leaveTab = function (event) {
            //console.dir(event);
            var element, pX, pY, eX, eY, eH, eW, leavingLeft, leavingRight, leavingTop, leavingBottom;
            pX = event.pageX;
            pY = event.pageY;
            element = angular.element(event.currentTarget);
            eX = event.target.getBoundingClientRect().left;
            eY = event.target.getBoundingClientRect().top;
            eH = element.prop('offsetHeight');
            eW = element.prop('offsetWidth');
            leavingLeft = pX <= eX;
            leavingRight = pX >= (eX + eW);
            leavingBottom = pY >= (eY + eH);
            leavingTop = pY <= eY;
            if (pY >= (eY + eH)) { // if pointer Y pos is gt (elem y + elem height)
                vm.setHover(true);
            } else {
                vm.setHover(false);
            }
        };

        /**
         * What happens when a user mouse enters a tab with a submenu.
         * @param event
         */
        vm.enterTab = function (tabName, event) {
            var element, pX, pY, eX, eY, eH, eW;
            vm.showSubmenu = false;
            pX = event.clientX;
            pY = event.clientY;
            element = jQuery(event.currentTarget);
            eX = element.prop('offsetLeft');
            eY = element.prop('offsetTop');
            eH = element.height();
            eW = element.width();
            if (tabName === 'category') {
                vm.setDataList('category');
            } else if (tabName === 'brand') {
                vm.setDataList('brand');
            }
            vm.setHover(true);

        };

        vm.leaveSubmenu = function (event) {
            vm.setHover(false);
        };

        vm.subMenuButtonEnter = function (event) {
            console.log(event);
            vm.showSubmenu = true;
        };

        vm.leaveSubSubmenu = function (event) {
            vm.showSubmenu = false;
        };

        function success(response)  {
            console.log("Success getting product details.");
            console.log(response);
        }

        function error(reason) {
            console.log("error getting product details.");
            console.log(reason);
        }

        function render() {
            vm.service.callGenericMethod('/getWebMenu', 'GET', {}).then(
                function success(response) {
                    if (response.data &&
                        response.data.categoryDtoList &&
                        response.data.webBrandDtoList) {
                        vm.categoryList = response.data.categoryDtoList;
                        vm.brandList = response.data.webBrandDtoList;
                        $log.info(response);
                    } else {
                        $log.$error("Category response is missing the categoryDtoList.  Unable to process request.", response);
                    }

                }
            );

            vm.productMethods.getProdByCatId(12).then(success, error);
        }
        render();
    }
})();