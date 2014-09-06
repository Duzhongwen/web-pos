/**
 * Created by duzhongwen on 14-9-6.
 */
function get_discount_shop() {
    var shop_Array = Get_Shop_information();
    var lists = _.filter(shop_Array, function (list) {
        return  list.num >= 3;
    });
    return lists;
}

function get_free_count(){
    var number;
    var lists=get_discount_shop();
    _.each(lists,function(list) {
        number = parseInt(list.num / 3);
    });
    return number;
}

function Initialization(){
    var shop_Array = Get_Shop_information();
    shop_Array=[];
    localStorage.setItem('total',0);
    localStorage['Shopping'] = JSON.stringify(shop_Array);
}

function jugement_show(num,kind){
    if(kind=='饮料'||kind=='食品'){
        return num>=3;
    }
}

function get_free_shop() {
    var list=get_discount_shop();
    var lists = _.filter(list, function (lin) {
        return  lin.kind=="饮料"||lin.kind=="食品";
    });
    return lists;
}