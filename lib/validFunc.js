/**
 * Created by aty.max on 28.08.17.
 */
function validEmail(email) {
    var correctEmail = /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i.test(email);
    var correctDomain = validDomains.indexOf(email.split("@")[1]) !== -1;
    if (!correctEmail) {
        return "Некорректный формат Email!";
    }
    if (!correctDomain) {
        return "Некорректный домен!";
    }
    return "OK";
}

function validFio(fio) {
    if (fio.split(" ").length !== 3){
        return "Ф.И.О. должно состоять из трех букв!"
    }
    return "OK";
}

function validPhone(phone) {
    var sum = 0;
    for (var i = 0; i < phone.length; i++) {
        sum += parseInt(phone[i]);
    }
    if (sum > 30) {
        return "Сумма цифр телефонного номера не должна превышать 30!";
    }
    return "OK";
}

function validation() {
    return [validFio(getFio()), validEmail(getEmail()), validPhone(getPhone())];
}