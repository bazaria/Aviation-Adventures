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
    console.log(wheelEvent);
    $('#div_to_scroll').on(wheelEvent, function(e) {
        var oEvent = e.originalEvent,
            delta  = oEvent.deltaY || oEvent.wheelDelta;
            var div_to_scroll = document.getElementById('div_to_scroll');
            var maxScrollLeft = div_to_scroll.scrollWidth - div_to_scroll.clientWidth;
            console.log(maxScrollLeft);

        $('#div_to_scroll').scrollLeft($('#div_to_scroll').scrollLeft() +((delta/100)*(maxScrollLeft/20)));
        e.preventDefault();
    });
});