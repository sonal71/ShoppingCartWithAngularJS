myApp.service('GetProductsService', ['$http', '$q', function($http, $q){    
    var deferred = $q.defer();
    $http({ 
        method: 'GET', 
        url: 'api/products'
    })
    .success(function (data, status, headers, config) {
        deferred.resolve({data});
    })
    .error(function (data, status, headers, config) {
        deferred.reject();
    });
    return deferred.promise;
}]);

myApp.service('GetProductsInCartService', ['$http', '$q', 'UserService', 'Cart', function($http, $q, UserService, Cart){    
    var deferred = $q.defer();
    $http({ 
        method: 'GET', 
        url: 'api/cart/'+UserService.user_id
    })
    .success(function (data, status, headers, config) {
        Cart.data = data;
        deferred.resolve({data});
    })
    .error(function (data, status, headers, config) {
        deferred.reject();
    });
    return deferred.promise;
}]);

myApp.service('UserService', function(){
   this.user_id = 2; 
});

myApp.service('Cart', function(){
    this.data = { };
    this.totalItems;
    this.totalAmount;
});

myApp.service('ItemInCartCount', ['$http', '$q', 'UserService', 'Cart', function($http, $q, UserService, Cart){
    var deferred = $q.defer();
    $http({ 
        method: 'GET', 
        url: 'api/cart/'+UserService.user_id
    })
    .success(function (data, status, headers, config) {
        length = data.length;
        Cart.totalItems = length;
        deferred.resolve({length});
    })
    .error(function (data, status, headers, config) {
        deferred.reject();
    });
    return deferred.promise;
}]);

myApp.constant("products", [
		{	
	    	"productID" : 1,
	    	"productHandle" : "product-1-tshirt",
	    	"title" : "T-Shirt",
	    	"imageSrc" : "http://localhost:8080/lib/t-shirt.png",
	    	"imageAltText" : "T-Shirt",
	    	"price" : "16",
	    	"description" : "First Example product"
	  	},{	
	    	"productID" : 2,
	    	"productHandle" : "product-1-tshirt",
	    	"title" : "T-Shirt",
	    	"imageSrc" : "http://localhost:8080/lib/t-shirt.png",
	    	"imageAltText" : "T-Shirt",
	    	"price" : "105",
	    	"description" : "Second Example product"
	  	},{	
	    	"productID" : 3,
	    	"productHandle" : "product-1-tshirt",
	    	"title" : "T-Shirt",
	    	"imageSrc" : "http://localhost:8080/lib/t-shirt.png",
	    	"imageAltText" : "T-Shirt",
	    	"price" : "16.79",
	    	"description" : "Third Example product"
	  	},{	
	    	"productID" : 4,
	    	"productHandle" : "product-1-tshirt",
	    	"title" : "T-Shirt",
	    	"imageSrc" : "http://localhost:8080/lib/t-shirt.png",
	    	"imageAltText" : "T-Shirt",
	    	"price" : "10.99",
	    	"description" : "Fourth Example product"
	  	},{	
	    	"productID" : 5,
	    	"productHandle" : "product-1-tshirt",
	    	"title" : "T-Shirt",
	    	"imageSrc" : "http://localhost:8080/lib/t-shirt.png",
	    	"imageAltText" : "T-Shirt",
	    	"price" : "40",
	    	"description" : "Fifth Example product"
	  	},{	
	    	"productID" : 6,
	    	"productHandle" : "product-1-tshirt",
	    	"title" : "T-Shirt",
	    	"imageSrc" : "http://localhost:8080/lib/t-shirt.png",
	    	"imageAltText" : "T-Shirt",
	    	"price" : "35",
	    	"description" : "Sixth Example product"
	  	},{	
	    	"productID" : 7,
	    	"productHandle" : "product-1-tshirt",
	    	"title" : "T-Shirt",
	    	"imageSrc" : "http://localhost:8080/lib/t-shirt.png",
	    	"imageAltText" : "T-Shirt",
	    	"price" : "25.49",
	    	"description" : "Seventh Example product"
	  	},{	
	    	"productID" : 8,
	    	"productHandle" : "product-1-tshirt",
	    	"title" : "T-Shirt",
	    	"imageSrc" : "http://localhost:8080/lib/t-shirt.png",
	    	"imageAltText" : "T-Shirt",
	    	"price" : "20",
	    	"description" : "Eighth Example product"
	  	}

	]);