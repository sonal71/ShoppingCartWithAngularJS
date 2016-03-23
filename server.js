var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

mongoose.connect('mongodb://localhost:27017/shopping_cart');     // connect to mongoDB database on modulus.io

var db = mongoose.connection;

app.use(express.static(__dirname + '/public'));        // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


var Schema = mongoose.Schema;
var productsSchema = new Schema({
    "productID" : String,
    "productHandle" : String,
    "title" : String,
    "imageSrc" : String,
    "imageAltText" : String,
    "price" : String,
    "description" : String
}, {
    versionKey: false 
});
var Products = mongoose.model('Products', productsSchema);

var cartSchema = new Schema({
    "userId" : String,
    "productID" : String,
    "productHandle" : String,
    "title" : String,
    "imageSrc" : String,
    "imageAltText" : String,
    "price" : String,
    "description" : String
}, {
    versionKey: false 
});
var Cart = mongoose.model('Cart', cartSchema);

var discountSchema = new Schema({
    "discountId" : String,
    "discountAmount" : String,
    "discountPercentage" : String
});
var Discount = mongoose.model('Discount', discountSchema);


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

/*-------- API --------*/

/* Products REST methods */

app.get('/api/products', function(req, res) {
    Products.find(function(err, products) {
        if (err){
            res.send(err)
        }
        res.json(products); 
    });
});

app.get('/api/products/:product_id', function(req, res) {
    Products.find({ "productID" : req.params.product_id},function(err, product) {
        if (err){
            res.send(err)
        }
        console.log(product);
        res.json(product);
    });
});


//    app.post('/api/products', function(req, res) {
//        Products.create({
//            text : req.body.text,
//            done : false
//        }, function(err, product) {
//            if (err)
//                res.send(err);
//            Products.find(function(err, products) {
//                if (err)
//                    res.send(err)
//                res.json(products);
//            });
//        });
//    });

app.delete('/api/products/:product_id', function(req, res) {
    Products.remove({
        productID : req.params.product_id
    }, function(err, product) {
        if (err)
            res.send(err);

        Products.find(function(err, products) {
            if (err)
                res.send(err)
            res.json(products);
        });
    });
});

/* Cart REST methods */

app.get('/api/cart/:user_id', function(req, res) {
    Cart.find({"userId": req.params.user_id},function(err, cart) {
        if (err){
            res.send(err)
        }
        res.json(cart);
    });
});

app.post('/api/cart', function(req, res) {
    var cart = new Cart(req.body);
    cart.save(function(err) {
        if (err) {
            return next(err);
        } else {
            Cart.find(function(err, products) {
            if (err)
                res.send(err)
            res.json(products);
            });
        }
    });

});

app.delete('/api/cart/:user_id/:product_id', function(req, res) {
    Cart.remove({
        userId: req.params.user_id,
        productID : req.params.product_id
    }, function(err, cart) {
        if (err)
            res.send(err);

        Cart.find(function(err, cart) {
            if (err)
                res.send(err)
            res.json(cart);
        });
    });
});

app.delete('/api/cart/:user_id', function(req, res) {
    Cart.remove({
        userId: req.params.user_id
    }, function(err, cart) {
        if (err)
            res.send(err);

        Cart.find(function(err, cart) {
            if (err)
                res.send(err)
            res.json(cart);
        });
    });
});

/* Discounts REST methods */

app.get('/api/discount/:discount_id', function(req, res) {
    console.log(req.params.discount_id);
    Discount.findOne({"discountId": req.params.discount_id},function(err, discount) {
        if (err){
            res.send(err)
        }
        res.json(discount);
    });
});