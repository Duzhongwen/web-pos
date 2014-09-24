/**
 * Created by zhouyong on 14-9-18.
 */
$(function(){
    $('#product_ist').addClass('active');

    $('.addCart').click(function(){
        var information = [];
        $($(this).parent().siblings()).each(function(){
            information.push($(this).text());
        });
        var shop = {
            kind:information[0],
            name:information[1],
            price:information[2],
            unit:information[3],
            discounts:information[4]
        };
        $.post('/addCart',{product:shop},function(data){
            $('#cart_total').text(data);
        });
    });

});