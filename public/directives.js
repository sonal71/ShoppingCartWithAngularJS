myApp.directive("productList", function($compile){
	return {
		restrict: 'AE',
		templateUrl: 'directives/productList.html',
		replace: true,
		scope: {
			productInfo: '=',
			addToCartFunction: '&',
			productsInCart: '='
		}
	}
});

myApp.directive("bootstrapAlert", function($compile){
	return {
		restrict: 'AE',
		templateUrl: 'directives/alert.html',
		replace: true,
		scope: {
			class: '@',
			alertText: '@'
        }
	}
});