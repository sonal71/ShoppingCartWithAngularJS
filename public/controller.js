myApp.controller('headerController', ['$scope', 'Cart', function($scope, Cart){

	if(Cart.totalItems === undefined){
		Cart.totalItems = 0;
	}
    setTimeout(function(){
        $scope.$root.totalItems = Cart.totalItems
    }, 100);
    
}]);

myApp.controller('mainController', ['$scope', '$http', '$filter', 'GetProductsService', 'UserService', 'Cart', function($scope, $http, $filter, GetProductsService, UserService, Cart){
    $scope.products = GetProductsService.$$state.value.data;
    $scope.productsInCart = Cart.data;
    
    $scope.addToCart = function(productID) {
        $scope.productsInCart = Cart.data;
        $scope.productExist = false;
        
        angular.forEach($scope.productsInCart, function(value, key){
            if(value.productID === productID) {
                $scope.productExist = true;
                return false; 
            }
        });
        if(!$scope.productExist) {
            $scope.productToAdd = $filter('filter')($scope.products, function (d) {
                                                        return d.productID === productID;
                                                    })[0];
            $scope.data = {
                "userId":        UserService.user_id,
                "productID":     $scope.productToAdd.productID,
                "productHandle": $scope.productToAdd.productHandle,
                "title":         $scope.productToAdd.title,
                "imageSrc":      $scope.productToAdd.imageSrc,
                "price":         $scope.productToAdd.price,
                "imageAltText":  $scope.productToAdd.imageAltText,
                "description":   $scope.productToAdd.description
            };
            $http({
                method  : 'POST',
                url     : '/api/cart',
                data    : $.param($scope.data), 
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(response){
                $scope.data = {};
                $scope.productsInCart = Cart.data = response;
        
                Cart.totalItems = parseInt(Cart.totalItems) + 1;
                $scope.$root.totalItems = Cart.totalItems;
        
            });
        } else {
            $('#myModal').modal({keyboard: true});
        }
    }
    
}]);

myApp.controller('cartController', ['$scope', '$filter', '$http', 'ProductsInCart', 'UserService', 'Cart', function($scope, $filter, $http, ProductsInCart, UserService, Cart){
	$scope.totalItems = $scope.$root.totalItems;
    $scope.productsInCart = Cart.data;
    
    $scope.totalAmount = 0;
    angular.forEach($scope.productsInCart, function(value, key){
        $scope.totalAmount = parseFloat($scope.totalAmount) + parseFloat(value.price);
    });
        
    $scope.removeFromCart = function(user_id, product_id) {
        $scope.url = '/api/cart/'+user_id+'/'+product_id;
        $http({
            method  : 'DELETE',
            url     : $scope.url,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(response){
            $scope.productsInCart = Cart.data = response;
            $scope.totalAmount = 0;
            angular.forEach($scope.productsInCart, function(value, key){
                $scope.totalAmount = parseFloat($scope.totalAmount) + parseFloat(value.price);
            });
            Cart.totalItems = parseInt(Cart.totalItems) -1;
            $scope.totalItems = $scope.$root.totalItems = Cart.totalItems;
        });
    }
}]);

myApp.controller('checkOutController', ['$scope', '$filter', '$http', 'ProductsInCart', 'UserService', 'Cart', function($scope, $filter, $http, ProductsInCart, UserService, Cart){
    
    $scope.totalItems = $scope.$root.totalItems;
    $scope.productsInCart = Cart.data;
    
    $scope.discountCoupon = "";
    $scope.couponApplied = "";
    $scope.totalAmount = 0;
    
    angular.forEach($scope.productsInCart, function(value, key){
        $scope.totalAmount = parseFloat($scope.totalAmount) + parseFloat(value.price);
    });
    
    $scope.applyDiscount = function() {
        if($scope.couponApplied.length === 0){
            $scope.url = '/api/discount/'+$scope.discountCoupon;
            $http({
                method  : 'GET',
                url     : $scope.url,
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(response){
                if(response === null){ 
                    $('#noCouponModal').modal({keyboard: true});
                } else {
                    if(response.defaultAmount <= $scope.totalAmount) {
                        if(response.discountAmount !== null) {
                            $scope.totalAmount = $scope.totalAmount - response.discountAmount;
                        } else {
                            $scope.totalAmount = $scope.totalAmount - (response.discountPercentage*$scope.totalAmount/100);
                        }
                        $scope.couponApplied = response;
                    } else {
                        $('#discountConditionModal').modal({keyboard: true}); 
                    }
                }
            }).error(function(response){
                
            });
        } else {
            $('#couponModal').modal({keyboard: true});
        }
    }
    
    $scope.placeOrder = function() {
        $('#placeOrderModal').modal();
        Cart.data = {};
        $http({
            method  : 'DELETE',
            url     : 'api/cart/'+UserService.user_id,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(response){
            $scope.productsInCart = Cart.data = response;
            $scope.totalAmount = 0;
            Cart.totalItems = 0;
            $scope.totalItems = $scope.$root.totalItems = Cart.totalItems;
        });    
    }

}]);