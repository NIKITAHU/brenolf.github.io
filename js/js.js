var listener = new window.keypress.Listener();
var current = 0, size = 1, loader = 0;
var timer = null, speed = 10000;

var phrases = ['P. Sherman, 42, Sidney.', 'Zhu Li, do the thing!', 'To infinity, and beyond!', 'I like to move it, move it', 'The answer is 42', 'Gotta catch\'em all!', 'Brain, what you wanna do tonight?', 'Go, Appa! Yip yip!', 'Azarath metrion zinthos', 'Evaaa, WALL-EEEEE', 'Luke, I am your father'];

var colours = [['#315714', '#60a928'], ['#172b62', '#5578d7'], ['#000000', '#a5d302'], ['#363435', '#FF6600']];

listener.sequence_combo('up up down down left right left right b a enter', function() {
    // Make something funky here!
});

function mod (n, m) {
    return ((n % m) + m) % m;
}

function load () {
    $('.loader').animate({width: '100%'}, speed, function(){
        $('.loader').css('width', '0');
        slide(+1);
    });
}

function slide (n) {
    clearTimeout(timer);
    $('.loader').stop().css('width', '0');

    $('#prj-' + current).fadeOut('slow', function(){
        current = mod(current + n, size);
        $('#prj-' + current).fadeIn('slow');

        $('.block-4 h1').css('color', colours[current][0]);
        $('.block-4, .block-4 b').css('background', colours[current][1]);

        timer = setInterval(load, speed + 5);
    });
}

$(document).ready(function(){
    $('#postit').text(phrases[~~(Math.random() * phrases.length)]);

    size = $('.panel > div').length;

    $('.left').click(function(){
        slide(-1);
    });

    $('.right').click(function(){
        slide(+1);
    });
    
    $('section').snapPoint({
        scrollSpeed: 150
    });

    window.addEventListener('focus', function() {
        timer = setInterval(load, speed + 5);
    });

    window.addEventListener('blur', function() {
        clearTimeout(timer);
        $('.loader').css('width', '0');
    });

    load();
});