/**
 * Created by zhouyong on 14-9-18.
 */
function time(){
    var date = new Date();
    var year = date.getFullYear(),
        month = (date.getMonth()+1)<10?"0"+(date.getMonth()+1):date.getMonth()+ 1,
        day = date.getDate()<10?"0"+date.getDate():date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();
    var time = year+"年"+month+"月"+day+"日"+" "+hours+":"+minutes+":"+seconds;
    $('#data').text(time);
}
$(function(){
    time();
    setInterval('time()',1000);
});