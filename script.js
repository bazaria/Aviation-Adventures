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

$(document).ready(function() {
    var wheelEvent = isEventSupported('mousewheel') ? 'mousewheel' : 'wheel';
    $('body').on(wheelEvent, function(e) {
        
        if($('#div_to_scroll').is(':animated'))
        {
            return false;
        }
        var oEvent = e.originalEvent,
            delta  = oEvent.deltaY || oEvent.wheelDelta;
            var div_to_scroll = document.getElementById('div_to_scroll');
            var maxScrollLeft = div_to_scroll.scrollWidth - div_to_scroll.clientWidth;
            var quadScrollstr = String(maxScrollLeft/4);


        if(delta>0)
        {
            $('#div_to_scroll').animate({scrollLeft : "+=" +quadScrollstr}, 'slow');        
        }
        else{
            $('#div_to_scroll').animate({scrollLeft : "-=" + quadScrollstr}, 'slow');    
        }
        e.preventDefault();
    });
});