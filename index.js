/**
 * Created by aty.max on 12.08.17.
 */

'use strict';

const validDomains = ['ya.ru', 'yandex.ru', 'yandex.by', 'yandex.ua', 'yandex.kz', 'yandex.com'];

function validEmail(email) {
    return /^\w+@\w+\.\w{2,4}$/i.test(email) && validDomains.indexOf(email.split("@")[1]) !== -1;
}

function validFio(fio) {
    return fio.split(" ").length === 3;
}

function validPhone(phone) {
    var sum = 0;
    for (var i = 0; i < phone.length; i++) {
        sum += parseInt(phone[i]);
    }
    return sum < 31;
}

$(document).ready(function () {
    // Маска для российских телефонных номеров
    $("input[name=phone]").inputmask('phoneru');
});

$("#submitButton").click(function () {
    $("input[name=fio]").addClass("error");
});

$( '.js-input' ).keyup(function() {
    if( $(this).val() ) {
        $(this).addClass('not-empty');
    } else {
        $(this).removeClass('not-empty');
    }
});