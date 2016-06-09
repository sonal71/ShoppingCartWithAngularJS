# Shopping Cart With AngularJS

A single page app to create shopping cart using Angular JS. This application uses Node.js as server, MongoDb as Database, Express.js as router and AngularJs as Client side scripting language

Create a database 'shopping_cart' in Mongodb using following schema for collections:
```
To store product details
products {
    "productID" : String,
    "productHandle" : String,
    "title" : String,
    "imageSrc" : String,
    "imageAltText" : String,
    "price" : String,
    "description" : String
}

To store items in cart
carts {
    "userId" : String,
    "productID" : String,
    "productHandle" : String,
    "title" : String,
    "imageSrc" : String,
    "imageAltText" : String,
    "price" : String,
    "description" : String
}

/To store discount coupons
discounts {
    "discountId" : String,      // Discount coupon ID, entered by user
    "discountAmount" : String,   // Amount of discount or Discount in percentage
    "discountPercentage" : String,
    "defaultAmount" : String
}
```
