$(function() {
    var $slides = $('#slides');

    Hammer($slides[0]).on("swipeleft", function(e) {
        $slides.data('superslides').animate('next');
    });

    Hammer($slides[0]).on("swiperight", function(e) {
        $slides.data('superslides').animate('prev');
    });

    $slides.superslides();
    // $slides.superslides({
    //     hashchange: true
    // });
    // $slides.bind("init.slides", function () {
    //     $slides.superslides('animate', 1);
    // });

    $("#contact-menu").toggleClass('open');
    $("#contact-menu .contact-button").click(function () {
        $("#contact-menu").toggleClass('open');
    });


    getUserBio(1, function (data) {
        $(".intro .name").text(data.name);
        $(".intro .title").text(data.title);
        $(".intro .location").text(data.location);
        $(".intro .objective").text(data.objective);
        $("#email-link").attr("href", "mailto:" + data.email);
        $("#email-link").text(data.email);
    });
});