/**
 * Created by aty.max on 28.08.17.
 */
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