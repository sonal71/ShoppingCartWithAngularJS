myApp.config(function($routeProvider){
	$routeProvider
        .when('/', {
			templateUrl: 'pages/products.html',
			resolve:{
                GetProducts: ['GetProductsService', function(GetProductsService) {
                    return GetProductsService;
                }],
                ProductsInCart: ['GetProductsInCartService', function(GetProductsInCartService) {
                    return GetProductsInCartService;
                }],
                ItemsInCart: ['ItemInCartCount', function(ItemInCartCount){
                    return ItemInCartCount;
                }]
            }
		})
        .when('/cart/', {
            templateUrl: 'pages/cart.html',
            controller: 'cartController',
            resolve:{
                ProductsInCart: ['$q', '$http', 'UserService', function($q, $http, UserService) {
                    var deferred = $q.defer();
                    $http({ 
                        method: 'GET', 
                        url: 'api/cart/'+UserService.user_id,
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                    .success(function (data, status, headers, config) {
                        deferred.resolve({data});
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject();
                    });
                    return deferred.promise;
                }],
                ProductsInCart: ['GetProductsInCartService', function(GetProductsInCartService) {
                    return GetProductsInCartService;
                }],
                ItemsInCart: ['ItemInCartCount', function(ItemInCartCount){
                    return ItemInCartCount;
                }]
            }
		})
        .when('/checkout/', {
            templateUrl: 'pages/checkout.html',
            controller: 'checkOutController',
            resolve:{
                ProductsInCart: ['$q', '$http', 'UserService', function($q, $http, UserService) {
                    var deferred = $q.defer();
                    $http({ 
                        method: 'GET', 
                        url: 'api/cart/'+UserService.user_id,
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                    .success(function (data, status, headers, config) {
                        deferred.resolve({data});
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject();
                    });
                    return deferred.promise;
                }],
                ProductsInCart: ['GetProductsInCartService', function(GetProductsInCartService) {
                    return GetProductsInCartService;
                }],
                ItemsInCart: ['ItemInCartCount', function(ItemInCartCount){
                    return ItemInCartCount;
                }]
            }
		});
});
