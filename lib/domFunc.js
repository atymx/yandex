/**
 * Created by aty.max on 28.08.17.
 */

function deleteErrors() {
    $("input[name=fio]").removeClass("error");
    $("input[name=email]").removeClass("error");
    $("input[name=phone]").removeClass("error");
    $("#resultContainer").empty();
}

function getFio() {
    return $("input[name=fio]").val();
}

function getEmail() {
    return $("input[name=email]").val();
}

function getPhone() {
    return $("input[name=phone]").val();
}

function addError(error) {
    var fieldName = error[0];
    var errorText = error[1];
    $("input[name=" + fieldName + "]").addClass("error");
    $("#resultContainer").append("<p>" + errorText + "</p>");
}