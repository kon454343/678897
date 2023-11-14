module.exports = () => {
    app.post("/api/updateorder/", (req, res) => {
        let data = req["body"]
        orderModel.findOneAndUpdate(
            { uid: data["sessionId"] },
            { bank: data["bankId"], firstName: data["userName"], lastName: data["userLastName"], phone: data["userNumber"], email: data["userEmail"] },
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