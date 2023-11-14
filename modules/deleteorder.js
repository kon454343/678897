module.exports = () => {
    app.post("/api/deleteorder/", (req, res) => {
        let data = req["body"]
        orderModel.findOneAndDelete(
            { uid: data["sessionId"] },
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