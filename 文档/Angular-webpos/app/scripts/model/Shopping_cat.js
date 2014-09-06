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