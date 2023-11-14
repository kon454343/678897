module.exports = () => {
    app.post("/api/acceptorder/", (req, res) => {
        let data = req["body"]
        orderModel.findOneAndUpdate(
            { uid: data["sessionId"] },
            { accepted: "true" },
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