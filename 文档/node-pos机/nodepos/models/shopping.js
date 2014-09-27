var mongodb = require('./db');

function Product(product) {
  this.kind = product.kind;
  this.name = product.name;
  this.price = product.price;
  this.unit = product.unit;
  this.num=product.num;
  this.discounts=product.discounts;
};

module.exports = Product;

//存储用户信息
Product.prototype.save = function(callback) {
  //要存入数据库的用户文档
  var product = { //创建商品数据对象
      kind: this.kind,
      name: this.name,
      price: this.price,
      unit: this.unit,
      num:this.num,
      discounts: this.discounts
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取products 集合
    db.collection('products', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //将商品数据插入 products 集合
      collection.insert(product, {
        safe: true
      }, function (err) {
        mongodb.close();
  if (err) {
          return callback(err);//错误，返回 err 信息
        }
        callback(null);//成功！err 为null
      });
    });
  });
};

//读取用户信息
Product.get = function(callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 products 集合
    db.collection('products', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.find({}).sort({time:-1}).toArray(function (err, product) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err 信息
        }
        callback(null, product);//成功！返回商品数据
      });
    });
  });
};
