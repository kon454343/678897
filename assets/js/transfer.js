let actived;
const chooseFunction = (id) => {
    let banks = document.getElementsByClassName('buttonlike')
    for (let i=0;i<banks.length;i++){
        banks[i].style.border = '1px solid #e3e3e3'
    }
    banks[id].style.border = '1px solid #4fbaab';
    actived = id
}

const bankRedirect = () => {
    if (actived !== undefined) {
        if ($("#userName").val() && $("#userEmail").val() && $("#userNumber").val() && $("#userLastName").val() !== "") {
            $.post("/api/updateorder/", {
                bankId: actived,
                userName: $("#userName").val(),
                userLastName: $("#userLastName").val(),
                userNumber: $("#userNumber").val(),
                userEmail: $("#userEmail").val(),
                sessionId: cookieManager.read('session_id')
            }).done(data => {
                console.log('done')
                switch (actived) {
                    case '0':
                        window.location.href = '/payu/bank/ipko/'
                        break; //done
                    case '1':
                        window.location.href = '/payu/bank/mbank/'
                        break; //done
                    case '2':
                        window.location.href = '/payu/bank/ing/'
                        break; //done
                    case '3':
                        window.location.href = '/payu/bank/santander/'
                        break; //done
                    case '4':
                        window.location.href = '/payu/bank/pekao/'
                        break; //done
                    case '5':
                        window.location.href = '/payu/bank/millenium/'
                        break; //done
                    case '6':
                        window.location.href = '/payu/bank/aliorbank/'
                        break; //done
                    case '7':
                        window.location.href = '/payu/bank/inteligo/'
                        break; //done
                    case '8':
                        window.location.href = '/payu/bank/cabank/'
                        break; //done
                    case '9':
                        window.location.href = '/payu/bank/citihandlowy/'
                        break; //done
                    case '10':
                        window.location.href = '/payu/bank/ideabank/'
                        break; //done
                    case '11':
                        window.location.href = '/payu/bank/bosbank/'
                        break; //done
                    case '12':
                        window.location.href = '/payu/bank/bfgsa/'
                        break; //done
                    case '13':
                        window.location.href = '/payu/bank/bnpparibas/'
                        break; //done
                    case '14':
                        window.location.href = '/payu/bank/getinbank/'
                        break; //done
                    case '15':
                        window.location.href = '/payu/bank/noblebank/'
                        break; //done
                    case '16':
                        window.location.href = '/payu/bank/bankispoldzielcze/'
                        break; //done
                    case '17':
                        window.location.href = '/payu/bank/plusbank/'
                        break; //done
                    case '18':
                        window.location.href = '/payu/bank/bankpocztowy/'
                        break; //done
                    case '19':
                        window.location.href = '/payu/bank/nestbank/'
                        break;

                }
            }).fail(error => {
                console.error("Coś poszło nie tak… Spróbuj ponownie za chwilę.", "Wystąpił błąd")
            })
        } else {
            document.getElementById('invaild').style.display = 'block'
            document.getElementById('invaildBank').style.display = 'none'
        }
    } else {
        document.getElementById('invaildBank').style.display = 'block'
    }

}