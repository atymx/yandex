/**
 * Created by aty.max on 12.08.17.
 */
'use strict';

$(document).ready(function () {
    // Маска для российских телефонных номеров
    $("input[name=phone]").inputmask('phoneru');
});

var MyForm = {
    selector: '#myForm',
    inputs: ['fio', 'email', 'phone'],

    getData: function () {
        var result = {};
        for (var key in this.inputs) {
            var inputName = this.inputs[key];
            result[inputName] = $('input[name=' + inputName + ']').val();
        }
        return result;
    },
    setData: function (Object) {
        for (var key in this.inputs) {
            var inputName = this.inputs[key];
            $('input[name=' + inputName + ']').val(Object[inputName]);
        }
    },

    deleteErrors: function () {
        $("input[name=fio]").removeClass("error");
        $("input[name=email]").removeClass("error");
        $("input[name=phone]").removeClass("error");
        $("#resultContainer").empty();
    },
    addErrorClassForField: function (fieldName) {
        $("input[name=" + fieldName + "]").addClass("error");
    },
    addErrorMessage: function (message) {
        $("#resultContainer").append("<p>" + message + "</p>");
    },

    getFio: function () {
        return this.getData()["fio"];
    },
    getEmail: function () {
        return this.getData()["email"];
    },
    getPhone: function () {
        return this.getData()["phone"];
    },

    validEmail: function () {
        var email = this.getEmail();

        if (!email) {
            return "Не введен email!";
        }

        const validDomains = ['ya.ru', 'yandex.ru', 'yandex.by', 'yandex.ua', 'yandex.kz', 'yandex.com'];
        var correctEmail = /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i.test(email);
        var correctDomain = validDomains.indexOf(email.split("@")[1]) !== -1;

        if (!correctEmail) {
            return "Некорректный формат Email!";
        }
        if (!correctDomain) {
            return "Некорректный домен!";
        }

        return "OK";
    },
    validFio: function () {
        var fio = this.getFio();

        if (!fio) {
            return "Не введен Ф.И.О.";
        }

        if (fio.split(" ").length !== 3 || (!fio.split(" ")[0] || !fio.split(" ")[1] || !fio.split(" ")[2])){
            return "Ф.И.О. должно состоять из трех слов!"
        }
        return "OK";
    },
    validPhone: function () {
        var phone = this.getPhone();

        if (!phone) {
            return "Не введен номер телефона!";
        }

        var sum = 0;
        var num = 0;
        for (var i = 0; i < phone.length; i++) {
            if (isFinite(phone[i])) {
                sum += parseInt(phone[i]);
                num++;
            }
        }

        if (num !== 11) {
            return "Телефонный номер должен содержать 11 цифр!"
        }

        if (sum > 30) {
            return "Сумма цифр телефонного номера не должна превышать 30!";
        }

        return "OK";
    },

    validate: function () {
        var result = {
            isValid: true,
            errorFields: [],
            errorMessages: []
        };

        var fioValidResult = this.validFio();
        var emailValidResult = this.validEmail();
        var phoneValidResult = this.validPhone();

        if (fioValidResult !== "OK") {
            result.isValid = false;
            result.errorFields.push("fio");
            result.errorMessages.push(fioValidResult);
        }

        if (emailValidResult !== "OK") {
            result.isValid = false;
            result.errorFields.push("email");
            result.errorMessages.push(emailValidResult);
        }

        if (phoneValidResult !== "OK") {
            result.isValid = false;
            result.errorFields.push("phone");
            result.errorMessages.push(phoneValidResult);
        }

        return result;
    },

    submit: function () {
        //TODO: написать поведение формы
        this.deleteErrors();
        var validResult = this.validate();
        if (validResult.isValid) {
            var request = {
                method: 'POST',
                url: "server.json",
                data: MyForm.getData(),
                beforeSend: function () {
                    $("#submitButton").prop('disabled', true);
                },
                complete: function () {
                    $("#submitButton").prop('disabled', false);
                },
                success: function (data) {
                    MyForm.deleteErrors();
                    if (data.status === 'progress') {
                        $("#resultContainer").append('<p>В процессе</p>').addClass('progress');
                        setTimeout(function () {
                            console.log('Resend request');
                            $.ajax(request);
                        }, data.timeout);
                    } else if (data.status === 'error') {
                        $("#resultContainer").append(data.reason).addClass('error');
                    } else if (data.status === 'success'){
                        console.log(1);
                        $("#resultContainer").append('Успешно').addClass('success');
                    }
                },
                error: function () {
                    console.log("Request failed");
                }
            };
            $.ajax(request);
        } else {
            var errorFields = validResult.errorFields;
            var errorMessages = validResult.errorMessages;
            for (var key in errorFields) {
                this.addErrorClassForField(errorFields[key]);
            }
            for (var key in errorMessages) {
                this.addErrorMessage(errorMessages[key]);
            }
        }
    }
};


$("#submitButton").click(function () {
    MyForm.submit();
});
