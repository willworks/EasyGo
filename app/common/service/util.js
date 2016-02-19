function tips(msg) {
    document.documentElement.scrollTop = document.body.scrollTop =0;
    var u = '<div class="pop_tips"></div>';
    $("body").append(u);
    $(".pop_tips").html(msg).fadeIn("fast").delay(1000).fadeOut("fast");
}