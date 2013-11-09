$(function() {

    function inited() {
        var $slides = $('#slides');

        Hammer($slides[0]).on("swipeleft", function(e) {
            $slides.data('superslides').animate('next');
        });

        Hammer($slides[0]).on("swiperight", function(e) {
            $slides.data('superslides').animate('prev');
        });


        var contactSlideIndex;
        $slides.superslides();
        $slides.bind("init.slides", function () {
            contactSlideIndex = $slides.superslides('size') - 1;
        });

        // $slides.superslides({
        //     hashchange: true
        // });

        // $("#contact-menu").toggleClass('open');
        // $("#contact-menu .contact-button").click(function () {
        //     $("#contact-menu").toggleClass('open');
        // });

        $("#contact-menu .contact-button").click(function () {
            if ($slides.superslides('current') != contactSlideIndex)
                $slides.superslides('animate', contactSlideIndex);
            else
                $slides.superslides('animate', 0);
        });

        $slides.bind("animated.slides", function () {
             // $("#contact-menu .contact-button").toggleClass('current', $slides.superslides('current') == contactSlideIndex);
             var content = ($slides.superslides('current') == contactSlideIndex) ? "Home" : "Contact";
             $("#contact-menu .contact-button").text(content);
        });
    }


    getUserBio(1, function (data) {
        $(".intro .name").text(data.name);
        $(".intro .title").text(data.title);
        $(".intro .location").text(data.location);
        $(".intro .objective").text(data.objective);
        $("#email-link").attr("href", "mailto:" + data.email);
        $("#email-link").text(data.email);
        inited();
    });
});