angular.module('excelWireless')
    .controller('AddProductImageController', ['$scope', 'StoreService', '$http', function ($scope, StoreService, $http) {

        $scope.uploadImage = function (product_Id,value) {

           // var i =+ 1;
            var fileImage = document.querySelectorAll('#fileElement')[value].files[0];

            console.log(fileImage.size);

            var formData = new FormData();

            formData.append("file", fileImage);

            $http.post('http://localhost:8080/insertProductImage?product_Id='+product_Id, formData,
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

                StoreService.getData('http://localhost:8080/getProduct').then(
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