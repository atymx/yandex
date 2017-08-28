/**
 * Created by aty.max on 12.08.17.
 */
'use strict';

const validDomains = ['ya.ru', 'yandex.ru', 'yandex.by', 'yandex.ua', 'yandex.kz', 'yandex.com'];

$(document).ready(function () {
    // Маска для российских телефонных номеров
    $("input[name=phone]").inputmask('phoneru');
});

$( '.js-input' ).keyup(function() {
    if( $(this).val() ) {
        $(this).addClass('not-empty');
    } else {
        $(this).removeClass('not-empty');
    }
});

$("#submitButton").click(function () {
    //TODO: написать поведение формы
});