var login = '';
var dataTable = 0;
// выставляем секунды
var sec = 30;
// выставляем минуты
var min = 10;

$(document).ready(function() {
    $('#send').on('click', function() {
        var name = $('#name').val();
        login = name;
        //проверяем поле на наличие данных
        if (name.length !== 0) {
            name = $.trim(name);
            //создаем поле с игрой
            game(name);
        } else {
            alert("Введите имя для начала игры!");
        }
        // проверка на тестовый режим
        if (name == 'terter') {
            $('.clock').remove();
            name = $.trim(name);
            game(name);

        }
    });


    var spec = 0,
        runRight = 1,
        runLeft = 1;

    $(document).keydown(function(eventObject) {
            var num = eventObject.keyCode;
            var nav = navigator.userAgent;

            var navC = nav.match(/chrome/i);
            var navM = nav.match(/mozilla/i);
            //alert(num)

            if (navM == 'Mozilla') {

                switch (num) {
                    case 65:
                        $('.kor').css({
                            'margin-right': runRight += 40
                        });
                        break;
                    case 68:
                        $('.kor').css({
                            'margin-left': runLeft += 40
                        });
                }
            }

            if (navC == 'Chrome') {

                switch (num) {
                    case 65:
                        $('.kor').css({
                            'margin-right': runRight += 40
                        });
                        break;
                    case 68:
                        $('.kor').css({
                            'margin-left': runLeft += 40
                        });
                }
            }

            if (num == 32) {
                //анимация движения элементов
                if (!$('div').hasClass('bullet')) {

                    $('.kor').prepend('<div class="bullet"><div class="center"></div></div>');
                    $('.bullet').stop().animate({
                        'margin-top': '-400px',
                        'margin-bottom': '380px'

                    }, {
                        duration: 700,
                        step: function() {

                            var r = 5;
                            var R = 25;
                            $('.monster').each(function(index, event) {
                                //логика столкновения
                                var tops = $('.center').offset().top - $(this).offset().top - $(this).outerHeight();

                                var lefts = $('.center').offset().left - $(this).offset().left - $(this).outerWidth();

                                if (tops < (r + R)) {

                                    if (lefts < 5 && lefts > -55) {

                                        var spectacles = 0;
                                        spectacles += 10;
                                        spec += spectacles;
                                        dataTable += spec;
                                        $('p span').html(spec);

                                        $(this).addClass('dead').removeClass('monster');
                                        $('.dead').replaceWith('<li class="dead"></li>')
                                        $('.bullet').remove();

                                        if (spec == 200) {

                                            if (login != 'terter') {
                                                var name = $('#name').val();
                                                ajaxSet(login, spec);
                                            } else {
                                                $('li').css({
                                                    'background': 'red'
                                                });
                                            };
                                        };
                                    };
                                };
                            });
                        },
                        specialEasing: {
                            opacity: 'linear'
                        },
                        complete: function() {
                            if ($('div').hasClass('bullet')) {
                                $(this).remove();
                            }
                        }
                    });
                } else if ($('div').hasClass('bullet')) {

                }
            }
        })
        //функция добавления значения
    function game(name) {

        $('.kosmos').replaceWith('<div class="info"><p>Баллов заработанно:<span></span></p><p>Вы зашли как: Салатик</p></div><div class="container"><div class="game"><ul type="none"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul><div class="kor"><img src="img/kor.png"></div></div><div class="clock" ><p  id="timer"></p></div></div>');
        $('.info p:eq(1)').replaceWith('<p>Вы зашли как: ' + name + '</p>');
        $('li').addClass('monster');
        $('.monster').html('<img src="img/enemy.jpg">');
    }

    function ajaxSet(nameUser, score) {

        $.ajax({
            url: '/php/table.php',
            type: 'post',
            data: {
                score: score,
                name: nameUser
            },
            success: function(data) {
                $('.container').replaceWith(data);
                $('.info').replaceWith();
            }
        })
    }
});