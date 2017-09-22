function isEventSupported(eventName) {
    var el = document.createElement('div');
    eventName = 'on' + eventName;
    var isSupported = (eventName in el);
    if (!isSupported) {
        el.setAttribute(eventName, 'return;');
        isSupported = typeof el[eventName] == 'function';
    }
    el = null;
    return isSupported;
};

var slideIndex = 1;

function switch_to(index){
    if(index == slideIndex)
    {
        return;
    }
    var div_to_scroll = document.getElementById('div_to_scroll');
    var maxScrollLeft = div_to_scroll.scrollWidth - div_to_scroll.clientWidth;
    var amountPerSlide = maxScrollLeft/5;
    var newLocation = amountPerSlide*(index-1);
    slideIndex = index;
    $('#div_to_scroll').animate({scrollLeft : newLocation}, 900,'swing',function(){
      $('#div_to_scroll').stop(true);
      $('#div_to_scroll').animate({scrollLeft : newLocation}, 600);
    });
};


$(document).ready(function() {
    var wheelEvent = isEventSupported('mousewheel') ? 'mousewheel' : 'wheel';
    $('body').on(wheelEvent, function(e) {
        if($('#div_to_scroll').is(':animated'))
        {
            return false;
        }
        e.preventDefault();
        var oEvent = e.originalEvent,
            //delta = e.deltaY;
            delta  = oEvent.deltaY || oEvent.wheelDelta;
        var tempIndex = slideIndex;
        if(delta > 0)
        {
            if(slideIndex < 6)
            {
                tempIndex++;
            }
        }
        else
        {
            if(slideIndex > 0)
            {
                tempIndex--;
            }
        }
        switch_to(tempIndex);
      });
    $('#slide4-right-text-toggle').click(function(){
        if($('#slide4-right-text').is(':animated'))
        {
            return false;
        }
        $('#slide4-right-text').slideToggle(500,'easeInOutCubic');

        $('#slide4-right-text-toggle').toggleClass("arrowDown");
      });

    var modal1 = $('#book_lightbox');

    $('#book_now_button').click(function(){
        modal1.css('display','block');
    });

    $('#close_lightbox').click(function(){
        modal1.css('display','none');
    });
    var modal2=$('#gallery_modal');
    
    $(window).click(function(e){
        if(e.target.id == modal1.attr('id')){
            modal1.css('display','none');
        }
        if(e.target.id == modal2.attr('id')){
            modal2.css('display','none');
        }
    });

    var modal_image=$('#gallery_modal_image');
    var modal_caption=$('#gallery_modal_caption');

    function set_modal(img){
        modal2.css('display','block');
        modal_image.attr('src',img.attr('src'));
        modal_caption.html(img.attr('alt'));
    }

    $('#gallery_image1').click(function(){set_modal($('#gallery_img1'));});
    $('#gallery_image2').click(function(){set_modal($('#gallery_img2'));});
    $('#gallery_image3').click(function(){set_modal($('#gallery_img3'));});
    $('#order_form').on("submit",function(){
        var url = "/order";
        $.ajax({
            type: "POST",
            url: url,
            data: $('#order_form').serialize(),
            success: function(data){
                alert(data);
            }
        });
        return false;
    });
});
