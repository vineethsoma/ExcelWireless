angular.module('excelWireless')
    .factory('StoreService', StoreService);

StoreService.$inject = [ '$http'];


function StoreService($http){

    var vm = {};

    function StoreService() {}

    // StoreService.prototype.init = function(params) {
    //     params = angular.extend({ page: 1 }, params);
    //
    //     // Properties
    //     this.pagination = { perPage: 20, maxPages: 50 };
    //     this.posts = [];
    //
    //     // Load the initial page, using the URL param if available
    //     return this.load(params.page);
    // };
    //
    // StoreService.prototype.load = function(page) {
    //     page = parseInt(page, 10);
    //     page = isNaN(page) ? 1 : page;
    //
    //     var method = this.pagination.lastPage && page < this.pagination.lastPage ? 'unshift' : 'push';
    //
    //     // Define the current page
    //     if (this.pagination.totalPages) {
    //         page = Math.min(Math.max(page, 1), this.pagination.totalPages);
    //     }
    //
    //     // Only load a new page if it is not already loaded
    //     if ((page > this.pagination.lastPage || !this.pagination.lastPage) ||
    //         (page < this.pagination.firstPage || !this.pagination.firstPage)) {
    //         return this.get(page)
    //             .success(angular.bind(this, function(data) {
    //                 var response = data.response;
    //
    //                 // Set the last page
    //                 if (!this.pagination.lastPage || page > this.pagination.lastPage) {
    //                     this.pagination.lastPage = page;
    //                 }
    //
    //                 // Set the first page, if not already set
    //                 if (!this.pagination.firstPage || page < this.pagination.firstPage) {
    //                     this.pagination.firstPage = page;
    //                 }
    //
    //                 // Determine the total number of pages
    //                 this.pagination.totalPages = Math.ceil(response.total_posts / this.pagination.perPage);
    //
    //                 if (this.pagination.maxPages) {
    //                     this.pagination.totalPages = Math.min(this.pagination.totalPages, this.pagination.maxPages);
    //                 }
    //
    //                 // Append or prepend the fetched posts, depending if they are posts from the next or previous page
    //                 this.posts[method].apply(this.posts, response.posts);
    //
    //                 // Return the array of posts
    //                 return response.posts;
    //             }));
    //     } else {
    //         //return $q.reject();
    //         console.log("lazy load is not working");
    //     }
    // };
    //
    // StoreService.prototype.next = function() {
    //     var page = !this.pagination.lastPage ? 1 : this.pagination.lastPage + 1;
    //
    //     // Get the next page
    //     return this.load(page);
    // };
    //
    // StoreService.prototype.previous = function() {
    //     var page = !this.pagination.firstPage ? 1 : this.pagination.firstPage - 1;
    //
    //     // Get the previous page
    //     return this.load(page);
    // };
    //
    // StoreService.prototype.get = function(page) {
    //     var url = 'http://api.tumblr.com/v2/blog/fuckyeahcats.tumblr.com/posts/photo',
    //         config = {
    //             params: {
    //                 api_key: 'z46iUTiovIf3N5KdioKhU2vvTBMWRHA8KLeIBruDnEHTXpiK8n',
    //                 jsonp: 'JSON_CALLBACK',
    //                 limit: this.pagination.perPage
    //             }
    //         };
    //
    //     // Define the post number to start from
    //     config.params.offset = (page - 1) * config.params.limit;
    //
    //     // Make a HTTP request
    //     return $http.jsonp(url, config);
    // };
    //

    vm.getData = function (_url){

        return $http({
            method: 'GET',
            url: _url,
            cache: false
        });

    };

    vm.postData = function (_url,_reqData,content_type, accept) {

        var headerObj = {
            Accept : accept
        };
        return $http({
            method:'POST',
            url:_url,
            data:_reqData,
            headers : headerObj
        });

    }
    return vm;



}