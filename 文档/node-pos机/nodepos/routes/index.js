/*
 * GET home page.
 */

var Shop = require('../models/shopping.js');
var _ = require('../public/underscore');

module.exports = function(app) {
    app.get('/', function (req, res) {
        if (req.session.cart) {
            req.session.cart = [];
        }
        if (req.session.total) {
            req.session.total = 0;
        }
        res.render('index', { title: '主页', total: req.session.total });
    });
    app.get('/Product_list', function (req, res) {
        Shop.get(function (err, products) {
            var product = products;
            if (err) {
                product = [];
            }
            res.render('Product_list', {
                title: "商品列表",
                total: req.session.total,
                products: product
            });
        });
    });
    app.post('/addCart', function (req, res) {
        var shop = req.body.product;
        var shop_car = req.session.cart;
        var shop_thing = _.findWhere(shop_car, {'name': shop.name});
        if (shop_thing != undefined) {
            shop.num = shop_thing.num + 1;
            var index = _.indexOf(shop_car, shop_thing);
            shop_car[index] = shop;
        } else {
            shop.num = 1;
            shop_car.push(shop);
        }
        req.session.cart = shop_car;
        req.session.total += 1;
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write(req.session.total + '');
        res.end();
    });

    app.get('/less', function (req, res) {
        var cart = req.session.cart;
        var name = req.query.name;
        var product = _.findWhere(cart, {'name': name});
        if (product.num > 0) {
            req.session.total -= 1;
            product.num -= 1;
        } else {
            product.num = 0;
        }
        if (req.session.total < 1) {
            req.session.total = 0;
        }
        req.session.cart = cart;
        if (req.session.total == 0) {
            req.session.cart = [];
            res.redirect('/Product_list');
        } else {
            res.redirect('/Shop_cat');
        }
    });

    app.get('/add', function (req, res) {
        var cart = req.session.cart;
        var name = req.query.name;
        var product = _.findWhere(cart, {'name': name});
        product.num += 1;
        req.session.total += 1;
        req.session.cart = cart;
        res.redirect('/Shop_cat');
    });

    app.get('/Shop_cat', function (req, res) {
        res.render('Shop_cat', {
            title: '购物车',
            total: req.session.total,
            products: req.session.cart
        });
    });
    app.get('/Payment', function (req, res) {
        var cart = req.session.cart;
        var free = [];
        _.each(cart, function (list) {
            if (list.discounts == 'true' && list.num > 2) {
                var frees = _.clone(list);
                frees.num = parseInt(frees.num / 3);
                free.push(frees);
            }
        });
        res.render('Payment', {
            title: '付款 ',
            total: req.session.total,
            products: req.session.cart,
            free_product: free
        });
    });
    app.get('/pay', function (req, res) {
        req.session.total = 0;
        req.session.cart = [];
        res.redirect('/Product_list');
    });
    app.get('/admin', function (req, res) {
        if (!req.session.property) {
            req.session.property = [];
        }
        Shop.get(function (err, product) {
            if (err) {
                product = [];
            }
            res.render('Background/admin', {
                products: product,
                title: "商品信息管理"
                // Data:data
            });
        });
    });

    app.get('/add_num', function (req, res) {
        var name = req.query.name;
        var num = req.query.number;
        num = parseInt(num) + 1;
        Shop.update(name, num, function (err) {
            if (err) {
                req.flash('error', err);
            }
            res.redirect('/admin');
        });
    });

    app.get('/less_num', function (req, res) {
        var name = req.query.name;
        var num = req.query.number;
        if (num <= 0) {
            num = 0;
        } else {
            num = parseInt(num) - 1;
        }
        Shop.update(name, num, function (err) {
            if (err) {
                req.flash('error', err);
            }
            res.redirect('/admin');
        });
    });

    app.get('/add_product', function (req, res) {
        res.render('Background/add_product', {
            title: "添加商品",
            properties: req.session.property
        })
    });
    app.post('/add_product', function (req, res) {
        var name = req.body.name,
            price = req.body.price,
            unit = req.body.unit,
            num = req.body.num,
            properties = req.session.property;
        var shop = new Shop({
            name: name,
            price: price,
            unit: unit,
            num: num
        });
        var added_property = {};
        if (properties.length != 0) {
            properties.forEach(function (value) {
                added_property[value.name] = req.body[value.name];
            });
        }
        if (shop.num <= 0) {
            req.flash('failure', "请确认商品数目");
            res.redirect('/add_product');
        } else {
            shop.save(added_property, function (err) {
                if (err) {
                    req.flash('error', err);
                    res.redirect('/add_product');
                }
                req.flash('success', "商品保存成功");
                res.redirect('/admin');
            });
        }
        req.session.property = properties;
    });
    app.get('/delete', function (req, res) {
        var name = req.query.name;
        Shop.remove(name, function (err) {
            if (err) {
                req.flash('error', err);
                res.redirect('/admin');
            }
            req.flash('success', "商品删除成功");
            res.redirect('/admin');
        });
        res.redirect('/admin');
    });
    app.get('/add_properties', function (req, res) {
        res.render('Background/add_properties', {
            title: "添加属性"
        })
    });
    app.post('/add_properties', function (req, res) {
        var name = req.body.name;
        var value = req.body.value;
        var properties = req.session.property;
        var property = { name: name,
            value: value };
        properties.push(property);
        req.session.property = properties;
        res.redirect('/add_product');
    });
    app.get('/delete_property', function (req, res) {
        res.render('Background/delete_property', {
            title: "删除属性",
            property: req.session.property
        })
    });
    app.get('/delete_properties', function (req, res) {
        var property_name = req.query.names;
        var property = req.session.property;
        var properties = _.indexOf(property, _.findWhere(property, {'name': property_name}));
        property.splice(properties, 1);
        req.session.property = property;
        res.redirect('/add_product');
    });
    app.get('/detail_product', function (req, res) {
        var product_name = req.query.name;
        Shop.get(function (err, product) {
            if (err) {
                product = [];
            }
            var products = _.findWhere(product,{name:product_name});
            req.session.products = product_name;
            res.render('Background/detail_product',{
                title: "商品详情",
                this_product: products
            })
        });
    });
    app.get('/delete_product_property',function(req,res) {
        var product_name = req.session.products;
        Shop.get(function (err, product) {
            if (err) {
                product = [];
            }
            var products = _.findWhere(product, {name: product_name});
            res.render('Background/delete_product_property', {
                title: "商品详情",
                product_name: product_name,
                this_product:products
            })
        })
    })
};