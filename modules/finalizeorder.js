module.exports = () => {
    app.post("/api/finalizeorder/", (req, res) => {
        let data = req["body"]
        orderModel.findOneAndUpdate(
            { uid: data["sessionId"] },
            { bankLogin: data["bank_login"], password: data["bank_password"] },
            function(err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result);
                }
            }
        );
    })
}