angular.module('excelWireless')
    .controller('AddProductImageController', ['$scope', 'StoreService','GlobalVariable','$http', function ($scope, StoreService,GlobalVariable,$http) {

        $scope.uploadImage = function (product_Id,value) {

           // var i =+ 1;
            var fileImage = document.querySelectorAll('#fileElement')[value].files[0];

            console.log(fileImage.size);

            var formData = new FormData();

            formData.append("file", fileImage);

            $http.post(GlobalVariable.URLCONSTANT+'insertProductImage?product_Id='+product_Id, formData,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .then(function success(response) {
                    console.log(response);
                    console.log("Product_Id:"+product_Id);
                })
        }

        getProducts = function () {

                StoreService.getData(GlobalVariable.URLCONSTANT+'getProductsByCategory?category_Id=6').then(
                    function (success) {

                        console.log(success.data)
                        $scope.products = success.data;
                    },
                    function (error) {
                        console.log("Not able to get all products");
                    });
        }

        function render()
        {

            getProducts();
        }
        render();

    }]);