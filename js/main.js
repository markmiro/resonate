(function() {
    $('#slides').superslides();
    $('#slides').bind("init.slides", function () {
        $('#slides').superslides('animate', 1);
    });
}());