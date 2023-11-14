const config = require("config"),
    loginConfig = config.get("Application.auth")

var ID = function () {
    return Math.random().toString(36).substr(2, 20);
};
var longID = function () {
    return ID().toUpperCase() + ID().toUpperCase() + ID().toUpperCase() + ID().toUpperCase() + ID().toUpperCase()
}


module.exports = () => {
    app.post("/api/login/", (req, res) => {
        global.adminSess = longID()
        var seId = longID()
        console.log("1: " + seId)
        let data = req["body"]
        const sendResponse = (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send(seId)
                console.log("2: " + seId)
            }
        }
        if (data["authPassword"] == loginConfig["password"]) {
            sendResponse()
            console.log('Użytkownik został zautoryzowany do panelu admina, ID Sesji: ' + global.adminSess)
            adminModel.create({ sessionId: seId })
        } else {
            console.log('Nieudana próba logowania do panelu admina - ' + new Date())
        }


    })
}