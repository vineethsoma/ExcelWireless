(function () {
    'use strict';

    angular.module('excelWireless').controller('BodyController', Body);

    Body.$inject = ['$scope','$rootScope', '$state', '$window', '$log', '$timeout', 'dataService', 'StoreService','GlobalVariable'];

    function Body($scope, $rootScope,$state, $window, $log, $timeout, dataService, StoreService,GlobalVariable) {

        var vm = this;
        vm.showMenu = false;
        vm.showSubmenu = false;
        vm.service = dataService;
        vm.categoryList = [];
        vm.brandList = [];
        vm.subListData = [];
        vm.dataList = [];
        vm.productList = [];
        vm.responseData = {};
        // vm.productMethods = productDetailsService;

        vm.setDataList = function (name) {
            vm.dataList = [];
            if (name === 'category') {
                vm.categoryList.forEach(function (item, index) {
                    vm.dataList.push({"categoryId": item.categoryId, "id": item.categoryId, "name": item.categoryName});
                });

            } else if (name === 'brand') {
                vm.brandList.forEach(function (item, index) {
                    if (item.modelDtoList && item.modelDtoList.length > 0) {
                        item.modelDtoList.forEach(function(o, i) {
                            if (o.modelName) {
                                o['description'] = o.modelName;
                            }
                        });
                    }
                    vm.dataList.push({ "brandId": item.brandId, "id": item.brandId, "name": item.brandName, "modelList": item.modelDtoList })
                });
            }
        };


        vm.getSubMenuItems = function(dataItem) {

            var item = {};
            vm.subListData = [];
            if (dataItem.hasOwnProperty("brandId")) {
                $log.info("Checking model data for brand: " + dataItem.brandId);
                $log.info(dataItem);
                // we have brands, now get the models.
                item = _.find(vm.dataList, function(o) { return o.brandId === dataItem.brandId; });
                if (item && item.modelList) {
                    vm.subListData = item.modelList || [];
                    console.log(vm.subListData);
                }
                if (vm.subListData.length > 0) {
                    vm.showSubmenu = true;
                } else {
                    vm.showSubmenu = false;
                }
            } else if (dataItem.hasOwnProperty("categoryId")) {
                $log.info("Checking Product data for category: " + dataItem.categoryId);
                $log.info(dataItem);
                item = _.find(vm.dataList, function(o) { return o.categoryId === dataItem.categoryId; });
                $log.info(item);
                if (item) {

                        StoreService.getData(GlobalVariable.URLCONSTANT+'getProductsByCategory?category_Id='+item.categoryId).then(
                            function (response) {

                                console.log(response.data);
                                GlobalVariable.product = {};
                                if (response.data) {
                                    vm.subListData = _.filter(response.data, function(o) { return o.categoryId === item.categoryId; })
                                    console.log(vm.subListData);
                                    GlobalVariable.product = response.data;
                                    $state.go('products');
                                }

                            },
                            function (error) {
                                console.log("getReplenishmentInfo call failed");
                            });


                }
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
            //console.log(event);
            //vm.showSubmenu = true;
        };

        vm.leaveSubSubmenu = function (event) {
            vm.showSubmenu = false;
        };

        function success(response)  {
            vm.productList = response.data || [];
            //console.log("Success getting product details.");
            //console.log(response);
        }

        function error(reason) {
            //console.log("error getting product details.");
            //console.log(reason);
        }


        vm.getProductDetails = function () {

                $state.go('partProducts');
        }
        vm.cartCount =0;
        $rootScope.$on('updateCount',function(event,value){

                vm.cartCount += parseInt(value);
        });

        vm.renderOrderPage = function () {
            $state.go('order');
        }

        function render() {
            vm.service.callGenericMethod('/getWebMenu', 'GET', {}).then(
                function success(response) {
                    if (response.data &&
                        response.data.categoryDtoList &&
                        response.data.webBrandDtoList) {
                        vm.categoryList = response.data.categoryDtoList;
                        $log.info("categories");
                        $log.info(vm.categoryList);
                        vm.brandList = response.data.webBrandDtoList;

                        GlobalVariable.brandModelDto = vm.dataList;
                        $log.info("Side brands");
                        $log.info(GlobalVariable.brandModelDto)

                        $log.info("brands");
                        $log.info(vm.brandList);
                    } else {
                        $log.$error("Category response is missing the categoryDtoList.  Unable to process request.", response);
                    }

                }
            );

        //     vm.productMethods.getProdByCatId(12).then(success, error);
         }
        render();
    }
})();