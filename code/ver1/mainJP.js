var isAnimated = true;
$(document).ready(function() {});

$(window).load(function() {
    // Animate loader off screen
    $(".cssload-loader").fadeOut("slow");
    $(".loading-container").css('display', 'none');
});

/* Action when click back to top button */
function topFunction() {
    $('body,html').animate({
        scrollTop: 0
    }, 800);
    return false;
}

$(window).on("scroll", function() {
    /* Show or hide top button */
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
        document.getElementById("scoll-down").style.display = "none";
    } else {
        document.getElementById("myBtn").style.display = "none";
        document.getElementById("scoll-down").style.display = "block";
    }
    if ($(window).scrollTop() >= $("nav").offset().top && $(window).width() > 992) {
        $('nav').addClass('fixed');
        $('nav .wild-text').css('margin-left', '15px')
    } else {
        $('nav').removeClass('fixed');
        $('nav .wild-text').css('margin-left', '-500px')
    }
    if ($(window).scrollTop() >= $(".information-container").offset().top - 10) {
        $('nav ul li a').removeClass('is-active');
        $('.nav-about-me').addClass('is-active');
    }
    if ($(window).scrollTop() >= $(".skill-container").offset().top - 10) {
        $('nav ul li a').removeClass('is-active');
        $('.nav-skill').addClass('is-active');
    }
    if ($(window).scrollTop() >= $(".experience-container").offset().top - 10) {
        $('nav ul li a').removeClass('is-active');
        $('.nav-experience').addClass('is-active');
    }
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        $('nav ul li a').removeClass('is-active');
        $('.nav-contact').addClass('is-active');
    }
    if ($(window).scrollTop() >= $(".skill-container").offset().top - 200 && isAnimated) {
        isAnimated = false;
        $(".each-skill").each(function(index) {
            var thisa = $(this);
            var maxPercent = parseInt($(this).find(".percent-hide").text())
            var i = 0;
            var interval = setInterval(function() {
                thisa.removeClass("p" + i);
                thisa.addClass("p" + (i + 1));
                i++;
                if (i >= maxPercent) {
                    clearInterval(interval); // If exceeded 100, clear interval
                }
            }, 30);
            var percentElement = $(this).find(".percent");
            $(percentElement).prop('Counter', 0).animate({
                Counter: maxPercent
            }, {
                duration: 3000,
                easing: 'swing',
                step: function(now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }
});

function goToAboutMeContainer() {
    $('html, body').animate({
        scrollTop: $(".information-container").offset().top
    }, 1000);
}

function goToSkillContainer() {
    $('html, body').animate({
        scrollTop: $(".skill-container").offset().top
    }, 1000);
}

function goToExperienceContainer() {
    $('html, body').animate({
        scrollTop: $(".experience-container").offset().top
    }, 1500);
}

function goToContactContainer() {
    $('html, body').animate({
        scrollTop: $("footer").offset().top
    }, 2000);
}

function openBlogModal() {
    $.ajax({
        type: 'POST',
        url: 'verifyUserBlog',
        dataType: "json"
    }).success(function(data) {
        if (data.IS_BLOG_USER == "true") {
            window.location.href = "blog"
        } else {
            $("#loginModal").modal();
        }
    });
}

function loginToBlog() {
    $.ajax({
        type: 'POST',
        url: 'loginToBlog',
        data: {
            password: $("#password").val()
        },
        dataType: "json"
    }).success(function(data) {
        if (data.IS_ALLOWED) {
            window.location.href = "blog"
        } else {
            $(".alert-message").html("");
            $(".alert-message").append("間違ったパスワード")
        }
    });
}

//Change background every 5 second
var imageChanged = 0;
setInterval(function() {
    //fade In - fade Out
    if (imageChanged == 0) {
        $('header').css("background-image", "url(background2.jpg)");
        imageChanged = 1;
    } else {
        $('header').css("background-image", "url(background.jpg)");
        imageChanged = 0;
    }
}, 5000);