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
    // Check which wheel event is supported. Don't use both as it would fire each event 
    // in browsers where both events are supported.
    var wheelEvent = isEventSupported('mousewheel') ? 'mousewheel' : 'wheel';
    console.log(wheelEvent);
    // Now bind the event to the desired element
    $('#div_to_scroll').on(wheelEvent, function(e) {
        var oEvent = e.originalEvent,
            delta  = oEvent.deltaY || oEvent.wheelDelta;

        // deltaY for wheel event
        // wheelData for mousewheel event
        $('#div_to_scroll').scrollLeft($('#div_to_scroll').scrollLeft() + delta);
        e.preventDefault();
    });
});