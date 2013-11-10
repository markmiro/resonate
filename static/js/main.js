$(function() {

    DEFAULT_TEXT = "Type something!";
    MAX_SLIDES = 8;
    currentUserId = 1;
    allData = null;
    function isEditing() {
        return $('body').hasClass('editing');
    }

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
        var $slidesContainer = $('.slides-container').first();

        $slides.superslides({
            animation: 'slide2',
            animation_speed: "faster"
        });


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

        $slides.bind("animated.slides", function (data) {
            var currentIndex = $slides.superslides('current');
            var label = (currentIndex == contactSlideIndex()) ? "Home" : "Request Meeting";
            $("#contact-menu .contact-button").text(label);
            $('#controls .delete-slide').toggleClass('disabled', currentIndex == 0 || currentIndex == contactSlideIndex());
            $('#controls .insert.before').toggleClass('disabled', currentIndex == 0);
            $('#controls .insert.after').toggleClass('disabled', currentIndex == contactSlideIndex());
        });


        function contactSlideIndex() {
            return $slides.superslides('size') - 1;
        }

        function getCurrentSlide() {
            var currentIndex = $slides.superslides('current');
            var domElement = $slidesContainer.find('> li').get(currentIndex);
            return $(domElement);
        }

        // $slides.superslides({
        //     hashchange: true
        // });

        // $("#contact-menu").toggleClass('open');
        // $("#contact-menu .contact-button").click(function () {
        //     $("#contact-menu").toggleClass('open');
        // });

        // $("#contact-menu .contact-button").text("Request Meeting");
        $("#contact-menu .contact-button").click(function () {
            var label;
            if ($slides.superslides('current') == contactSlideIndex()) {
                $slides.superslides('animate', 0);
                label = "Request Meeting";
            } else {
                $slides.superslides('animate', contactSlideIndex());
                label = "Home";
            }
            $("#contact-menu .contact-button").text(label);
        });


        // ----------------------------------------------
        // EDIT CODE
        // ----------------------------------------------

        var $previewButton = $(".preview-slide");
        $('body').addClass('editing');
        $previewButton.click(function () {
            $('body').toggleClass('editing');
            $('#controls').toggle(isEditing());
            if ($('body').hasClass('editing')) {
                $('head').append('<link rel="stylesheet" href="static/css/edit.css">')
                $previewButton.text('Done');
            } else {
                $("link[href='static/css/edit.css']").remove();
                $previewButton.text('Edit');
            }
        });

        $('.save-slide').click(function () {
            if ($slides.superslides('current') == 0) {
                var $current = getCurrentSlide();
                _.each(_.keys(allData.userbio), function (key) {
                    if ($current.find('.'+key).length > 0) // only replace items that were found in dom
                        allData.userbio[key] = $.trim($current.find('.'+key).text());
                });
                postUserBio(currentUserId.toString(), allData.userbio, function (data) {
                    console.log(data);
                });
            }
        });

        function addSlide(afterIndex) {

        }

        $('#controls .insert.after').click(function () {
            if ($slides.superslides('size') == MAX_SLIDES - 1)
                $('#controls .insert').addClass('disabled');
            if ($slides.superslides('size') >= MAX_SLIDES)
                return;
            var currentIndex = $slides.superslides('current');
            var $current = getCurrentSlide();
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
            $next.css('opacity', 0);
            setTimeout(function () {
                $next.fadeIn();
            }, 600);
            $next.find('li.editable').first().click();
            $('#slides').superslides('animate', 'next');
        });

        $('#controls .delete-slide').click(function () {
            if ($('#controls .delete-slide').hasClass('disabled')) return;
            var currentIndex = $slides.superslides('current');
            var $current = $($slidesContainer.find('li').get(currentIndex));
            $current.remove();
            $slides.superslides('update');
            $('.slides-pagination').find('a').last().remove();
            $('.slides-pagination').find('a').get(currentIndex).remove();
            $('#slides').superslides('animate', 'prev');
        });

        $('body').on("click", ".editable", function (e) {
            if (!isEditing()) return;
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

        $('body').on("blur", ".editable", function (e) {
            console.log('blurred');
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
    
    getUserData(currentUserId, function (data) {
        allData = data;
        console.log(data);
        addIntroCard(data.userbio);
        addStandardCards(data.cards);
        addContactCard(data.userbio);
        inited();
    });



});