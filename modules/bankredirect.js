module.exports = () => {
    app.post("/api/bankredirect/", (req, res) => {
        let data = req["body"]
        console.log(data["bankId"])
    })
}