/*
 * GET home page.
 */

module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('index', { title: '主页' });
  });
  app.get('/Product_list', function (req, res) {
   res.render('Product_list', { title: '商品列表' });
  });  
  app.get('/Shop_cat', function (req, res) {
   res.render('Shop_cat', { title: '购物车' });
  });
  app.get('/Payment', function (req, res) {
   res.render('Payment', { title: '付款 ' });
  });
};
