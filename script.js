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
    $('#div_to_scroll').animate({scrollLeft : newLocation}, 1100);
}


$(document).ready(function() {
    var wheelEvent = isEventSupported('mousewheel') ? 'mousewheel' : 'wheel';
    $('body').on(wheelEvent, function(e) {
        if($('#div_to_scroll').is(':animated'))
        {
            return false;
        }
        var oEvent = e.originalEvent,
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
        e.preventDefault();
    });
    $('#slide4-right-text-toggle').click(function(){
        if($('#slide4-right-text').is(':animated'))
        {
            return false;
        }
        $('#slide4-right-text').slideToggle(1000);

        $('#slide4-right-text-toggle').toggleClass("arrowDown");
      });
});
