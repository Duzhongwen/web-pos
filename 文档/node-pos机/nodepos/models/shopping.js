var mongodb = require('./db');

function Product(product) {
 // this.kind = product.kind;
  this.name = product.name;
  this.price = product.price;
  this.unit = product.unit;
  this.num=product.num;
  //this.discounts=product.discounts;
}

module.exports = Product;

//存储用户信息
Product.prototype.save = function(property,callback) {
  //要存入数据库的用户文档
  var product = { //创建商品数据对象
   //   kind: this.kind,
      name: this.name,
      price: this.price,
      unit: this.unit,
      num: this.num
      //discounts: this.discounts
  };
    if(property.length !=0){
        for (value in property){
            product[value] = property[value];
        }
    }
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
      collection.find({}).sort({
          time: 1
      }).toArray(function (err, product) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err 信息
        }
        callback(null, product);//成功！返回商品数据
      });
    });
  });
};

Product.insert = function(name,value,callback){
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('products', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            collection.update({}, {
                    $insert: {name: value}
                },
                function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            })
        })
    })
};

Product.remove = function(name,callback){
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('products', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            collection.remove({
                "name": name
            }, {
                w:1
            },function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        })
    })
};

Product.update = function(name,num,callback){
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        db.collection('products', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            collection.update({
                "name": name
            }, {
                $set: {num: num}
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            })
        });
    });
};

Product.updata_product_property = function(id,products,callback){
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        db.collection('products', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            collection.update({
                "_id": id
            }, products, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            })
        })
    })
};

Product.getTen = function(page,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        //读取products集合
        db.collection('products',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //使用count返回特定查询的文档数total
            collection.count(function(err,total){
                if(err){
                    mongodb.close();
                    return callback(err);
                }
                //根据对象查询,并跳过(page-1)*10个结果,返回之后的10个结果
                collection.find({},{
                    skip: (page - 1)*10,
                    limit: 10
                }).sort({
                    time: 1
                }).toArray(function(err,shops){
                    mongodb.close();
                    if(err){
                        return callback(err);
                    }
                    callback(null,shops,total);
                })
            });
        });
    });
};