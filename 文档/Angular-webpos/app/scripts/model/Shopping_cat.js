/**
 * Created by duzhongwen on 14-9-6.
 */
function Get_Shop_information(){
    var list=JSON.parse(localStorage['Shopping'] || '[]');
    return list;
}

function add_num(name){
    var shop_Araay = Get_Shop_information();
    var list= _.findWhere(shop_Araay,{'name':name});
    list.num += 1;
    localStorage['Shopping'] = JSON.stringify(shop_Araay);
}

function lower_num(name){
    var shop_Araay = Get_Shop_information();
    var list= _.findWhere(shop_Araay,{'name':name});
    if(list.num>0) {
        list.num -= 1;
    }else{
        list.num=0;
    }
    localStorage['Shopping'] = JSON.stringify(shop_Araay);
}

function lower_total(){
    var total=Get_num();
    if(total==0){
        localStorage.setItem('total',1);
    }else{
        localStorage.setItem('total',parseInt(localStorage.getItem('total'))-1);
        if(Get_num()<=0){
            localStorage.setItem('total',0);
        }
    }
}

function get_free(){
    var count=0;
    var  lists=Get_Shop_information();
    for(var i=0;i<lists.length;i++){
        count+=lists[i].prices*lists[i].num;
    }
    return count-get_all();
}

function Automatically_jump(){
    var shop_Array= Get_Shop_information();
    var lists=_.filter(shop_Array,function(list){
        return list.num==0;
    });
    return (lists.length==shop_Array.length);
}

function get_discounts(){
    var shop_Array= Get_Shop_information();
    _.each(shop_Array,function(list){
        var number=parseInt(list.num/3);
        var free_price = number * list.prices;
        if(list.kind=='饮料'||list.kind=='食品') {
            if (list.num > 0) {
                list.discounts = list.prices * list.num - free_price;
            }
            else {
                list.discounts = 0;
            }
        }else{
            list.discounts=list.prices * list.num;
        }
        localStorage['Shopping'] = JSON.stringify(shop_Array);
    });
}

function get_all(){
    var shop_Array = Get_Shop_information();
    var count=0;
    for(var i=0;i<shop_Array.length;i++){
        count+=shop_Array[i].discounts;
    }
    return count;
}