
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
}

var slideIndex = 1;
var SLIDESNUM = 7;


function calculateLocation(index){
    var div_to_scroll = document.getElementById('div_to_scroll');
    var maxScrollLeft = div_to_scroll.scrollWidth - div_to_scroll.clientWidth;
    var amountPerSlide = maxScrollLeft/(SLIDESNUM - 1);
    return amountPerSlide*(index-1);

}

function switch_to(index){
    if(index == slideIndex)
    {
        return;
    }
    var newLocation = calculateLocation(index);

    slideIndex = index;
    $('#div_to_scroll').animate({scrollLeft : newLocation}, 900,'swing',function(){
      $('#div_to_scroll').stop(true);
      $('#div_to_scroll').animate({scrollLeft : newLocation}, 600);
    });
}


function next_advantures_loader(){
    $.ajax({
		type: "GET",
		url: "/advantures",
		success: function(data){
			var advantures = JSON.parse(data);
			for(var prop in advantures)
			{
                var select_value = advantures[prop][1];
                $('#advanture' + String(prop)).attr('src','next/' + advantures[prop][0] + '.png').click(function(e){
                    open_contact_form(advantures[e.target.id[e.target.id.length - 1]][1]);
                });
                $('#select_adventure').append($('<option>',{
                    value: advantures[prop][1],
                    text : advantures[prop][2],
                }));
			}
		}
	});
}

function gallery_loader(){
    $.ajax({
        type: "GET",
        url: "/gallery",
        success: function(data){
            var gallery = JSON.parse(data);
            gallery_names = Object.keys(gallery);/*.sort(function(a,b){
            if(a[a.length - 1] > b[b.length - 1]){
                return 1;
            }
            else if(a[a.length - 1] < b[b.length - 1]){
                return -1;
            }
            else return 0;
            });*/
            for(var i=0; i< gallery_names.length; i++){
                $('#gallery_img' + (i+1).toString())
                    .prop('alt',gallery_names[i])
                    .prop('src', gallery[gallery_names[i]][0].src)
                    .on("click", {images: gallery}, function(e){
                    var pswpElement = document.querySelectorAll('.pswp')[0];
                    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, e.data.images[$(this).attr("alt")], {index: 0});
                    gallery.init();
                });
                $('#gallery-text'+ (i+1).toString()).text(gallery_names[i]);
            }
        },
    });
}

function open_contact_form(advanture){
    $('#modal-container').css('display','table');
    $('#modal-container').removeAttr('class').addClass('two');
    $('body').addClass('modal-active');
    $('#select_adventure').val(advanture).change();
}

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
            if(slideIndex < SLIDESNUM)
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



    var modal1 = $('#modal-container');

    $('#book_now_button').click(function(){
        open_contact_form('none');
    });

    $('#modal-background').click(function(e){
        if(!(e.target.id == $('.modal').attr('id') || $.contains($('#form-modal')[0], $('#'+ e.target.id)[0]))){
            modal1.addClass('out');
            $('body').removeClass('modal-active');
        }
    });
    $(window).resize(function(){
        $('#div_to_scroll').scrollLeft(calculateLocation(slideIndex));
    });
    $('#order_form').on("submit",function(){
        var url = "/order";
        $.ajax({
            type: "POST",
            url: url,
            data: $('#order_form').serialize(),
            success: function(data){
                if(data != '0')
                {
                    modal1.addClass('out');
                    $('body').removeClass('modal-active');
                    if(data=="1"){
                       Materialize.toast('Ошибка отправки электронной почты. Пожалуйста, повторите попытку позже.', 4000);
                     }
                    else{
                     Materialize.toast("Отправлено по электронной почте. С вами свяжутся в ближайшее время.", 4000);
                    }

                }
            }
        });
        return false;
    });
    gallery_loader();
    next_advantures_loader();
});
