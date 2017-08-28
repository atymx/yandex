/**
 * Created by aty.max on 12.08.17.
 */
'use strict';

const validDomains = ['ya.ru', 'yandex.ru', 'yandex.by', 'yandex.ua', 'yandex.kz', 'yandex.com'];

$(document).ready(function () {
    // Маска для российских телефонных номеров
    $("input[name=phone]").inputmask('phoneru');
});

$("#submitButton").click(function () {
    //TODO: написать поведение формы
    var url = $("form[name=myForm]").attr("action");
    deleteErrors();
    var validResult = validation();
    if (validResult[0] === "OK" && validResult[1] === "OK" && validResult[2] === "OK") {
         var request = $.ajax({
            method: 'POST',
            url: url,
            data: {"fio": getFio(), "email": getEmail(), "phone": getPhone()},
            beforeSend: function () {
                $(this).prop('disabled', true);
            },
            complete: function () {
                $(this).prop('disable', false);
            }
        });
        request.done(function (response) {
            console.log(response);
        })
    } else {
        if (validResult[0] !== "OK") {
            addError(["fio", validResult[0]]);
        }
        if (validResult[1] !== "OK") {
            addError(["email", validResult[1]]);
        }
        if (validResult[2] !== "OK") {
            addError(["phone", validResult[2]]);
        }
    }
});