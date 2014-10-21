var mongodb = require('./db');

function Rule (name,start_time,end_time,buy,free){
    this.name = name;
    this.day = {start_time:start_time,end_time:end_time};
    this.discount = {buy:buy,free:free}
}

module.exports = Rule;

Rule.prototype.save=function(callback){
    var rule={
      商品名:this.name,
      日期:this.day,
      折扣:this.discount
    };
    mongodb.open(function(err,db){
        if(err){
            return console.log(err);
        }
        db.collection('rules', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            collection.insert(rule, {
                safe: true
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);//错误，返回 err 信息
                }
                callback(null);//成功！err 为null
            });
        })
    })
};