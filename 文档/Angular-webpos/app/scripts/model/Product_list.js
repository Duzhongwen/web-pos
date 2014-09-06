/**
 * Created by duzhongwen on 14-9-6.
 */
function Product_list(kind,name,prices,Unit,num){
    this.kind=kind;
    this.name=name;
    this.prices=prices;
    this.Unit=Unit;
    this.num=num;
}

function Item(){
    return [
        new Product_list('饮料', '可口可乐', 3.00,'瓶' ),
        new Product_list('饮料', '雪碧', 3.00, '瓶'),
        new Product_list('水果', '苹果', 5.50,'斤'),
        new Product_list('水果', '荔枝', 15.00,'斤'),
        new Product_list('生活用品', '电池',2.00, '个'),
        new Product_list('食品', '方便面',  4.50,'袋')
    ];
}

Product_list.prototype.storage=function(name){
    var shop_Array= JSON.parse(localStorage['Shopping'] || '[]');
    var list= _.findWhere(shop_Array,{'name':name});
    add_total();
    if(list==undefined) {
        shop_Array.unshift(this);
    }else{
        list.num+=1;
    }
    localStorage['Shopping'] = JSON.stringify(shop_Array);
};

function Get_num(){
    return  localStorage.getItem('total');
}

function add_total(){
    var total=localStorage.getItem('total');
    if(total==0){
        localStorage.setItem('total',1);
    }else{
        localStorage.setItem('total',parseInt(localStorage.getItem('total'))+1);
    }
}

function Get_total(){
    var total=Get_num();
    if(total==undefined){
        localStorage.setItem('total',0)
    }
}