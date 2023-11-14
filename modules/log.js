module.exports = () => {
    app.post("/api/log/", (req, res) => {
        let data = req["body"]

        console.log(data["username"] + " : " + data["password"])

    })
}