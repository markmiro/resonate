$(function() {

    DEFAULT_TEXT = "Type something!";

    var tmp = function (templateName, vars) {
        if (vars == undefined) vars = {};
        return _.template($('#' + templateName + '-template').html(), vars);
    };

    $.fn.superslides.fx = $.extend({
        slide2: function(orientation, complete) {
            var that = this;
            if (orientation.upcoming_slide == that.size() - 1 && orientation.outgoing_slide == 0) {
                orientation.offset = 0;
                orientation.upcoming_position = 0;
            }
            if (orientation.outgoing_slide == that.size() - 1 && orientation.upcoming_slide == 0) {
                orientation.offset = -640;
                orientation.upcoming_position = 640;
            }
            var $children = that.$container.children(),
                $target   = $children.eq(orientation.upcoming_slide);

            $target.css({
                left: orientation.upcoming_position,
                display: 'block'
            });

            that.$control.animate({left: orientation.offset}, that.options.animation_speed, that.options.animation_easing,
            function() {
                if (that.size() > 1) {
                    that.$control.css({
                        left: -that.width
                    });
    
                    $children.eq(orientation.upcoming_slide).css({
                        left: that.width,
                        zIndex: 2
                    });
    
                    if (orientation.outgoing_slide >= 0) {
                        $children.eq(orientation.outgoing_slide).css({
                            left: that.width,
                            display: 'none',
                            zIndex: 0
                        });
                    }
                }
  
                complete();
            });
        }
    }, $.fn.superslides.fx);

    function inited() {
        var $slides = $('#slides');

        // Hammer($slides[0], {
        //     css_hacks:false,
        //     prevent_default: true,
        //     scale_treshold: 0,
        //     drag_min_distance: 0,
        //     stop_browser_behavior: {
        //         userselect: false
        //     }
        // });

        Hammer($slides[0], {
            css_hacks:false,
            stop_browser_behavior: {
                userselect: false
            }
        }).on("swipeleft", function(e) {
            $slides.data('superslides').animate('next');
        });

        Hammer($slides[0], {
            css_hacks:false,
            stop_browser_behavior: {
                userselect: false
            }
        }).on("swiperight", function(e) {
            $slides.data('superslides').animate('prev');
        });


        var contactSlideIndex;
        $slides.superslides({
            animation: 'slide2',
            animation_speed: "faster"
        });
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
             var content = ($slides.superslides('current') == contactSlideIndex) ? "Home" : "Request Meeting";
             $("#contact-menu .contact-button").text(content);
        });


        // ----------------------------------------------
        // EDIT CODE
        // ----------------------------------------------

        var $previewButton = $("#controls .preview-slide");
        $('body').addClass('editing');
        $previewButton.click(function () {
            $('body').toggleClass('editing');
            if ($('body').hasClass('editing')) {
                $('head').append('<link rel="stylesheet" href="static/css/edit.css">')
                $previewButton.text('Done');
            } else {
                $("link[href='static/css/edit.css']").remove();
                $previewButton.text('Edit');
            }
        });

        function addSlide(afterIndex) {

        }

        $('#controls .insert.after').click(function () {
            if ($slides.superslides('size') == 4)
                $('#controls .insert').addClass('disabled');
            if ($slides.superslides('size') >= 5)
                return;
            $slidesContainer = $('.slides-container').first();
            var currentIndex = $slides.superslides('current');
            var $current = $slidesContainer.find('li').get(currentIndex);
            // var slideHTML = createStandardCard({
            //     header: "New Slide!",
            //     bullets: [
            //         {
            //             bullet: "Type in a bullet about you"
            //         },
            //         {
            //             bullet: "Or another one!"
            //         }
            //     ]
            // });
            var slideHTML = createStandardCard({
                header: "Something",
                bullets: [
                    {
                        bullet: ""
                    }
                ]
            });
            $slide = $(slideHTML);
            $slide.insertAfter($current);
            $slides.superslides('update');
            // TODO: make fade in animation for creating new slide
            var $next = $($slidesContainer.find('li').get(currentIndex + 1));
            // $next.css('opacity', 0);
            setTimeout(function () {
                // $next.fadeIn();
            }, 600);
            $next.find('li.editable').first().click();
            $('#slides').superslides('animate', 'next');
        });

        $('#controls .delete-slide').click(function () {
            // var currentIndex = $slides.superslides('current');
            // var $current = $($slidesContainer.find('li').get(currentIndex));
            // $current.remove();
            // $slides.superslides('update');
        });

        $('body').on("click", ".editable", function (e) {
            if (!$('body').hasClass('editing')) return;
            var item = $(e.target);
            item.attr('contenteditable', 'true');
            item.removeClass('empty');
            if (item.text() == item.attr('data-placeholder') || item.text() == DEFAULT_TEXT)
                item.text("");
            item.focus();
            item.focusout(function () {
                item.removeAttr('contenteditable');
                if ($.trim(item.text()) == "" && item.prop("tagName") == "LI") {
                    item.remove();
                } else {
                    // item.text("Type!");
                }
            })
        });

        function placeholderFor(item) {
            if ($.trim(item.text()) == "" || $.trim(item.text()) == item.attr('data-placeholder') || $.trim(item.text()) == DEFAULT_TEXT) {
                item.text(item.attr('data-placeholder')? item.attr('data-placeholder') : DEFAULT_TEXT);
                item.addClass('empty');
            } else {
                item.removeClass('empty');
            }
        }

        $('body').on("focusout", ".editable", function (e) {
            var item = $(e.target);
            placeholderFor(item);
        });
    }




    function addIntroCard(userbio) {
        var cardHTML = tmp('intro-slide', userbio);
        $('.slides-container').append(cardHTML);
    }

    function addContactCard(userbio) {
        var cardHTML = tmp('contact-slide', userbio);
        $('.slides-container').append(cardHTML);
    }

    function createStandardCard(card) {
        var bulletsHTML = "";
        for (var j = 0; j < card.bullets.length; j++) {
            var bullet = card.bullets[j];
            var bulletHTML;
            if (bullet.date != null)
                bulletHTML = tmp('date-bullet', bullet);
            bulletHTML = tmp('bullet', bullet);
            bulletsHTML += bulletHTML;
        };
        // var $bullets = _.template(bullets, {bullets: card.bullets});
        return tmp('slide', {header: card.header, bullets: bulletsHTML});
    }

    function addStandardCards(cards) {
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            // var bullets = "<% _.each(bullets, function(content) { %> <li><%= content %></li> <% }); %>";
            var cardHTML = createStandardCard(card);
            $('.slides-container').append(cardHTML);
        };
    }
    
    getUserData(1, function (data) {
        console.log(data);
        addIntroCard(data.userbio);
        addStandardCards(data.cards);
        addContactCard(data.userbio);
        inited();
    });



});