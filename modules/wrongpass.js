module.exports = () => {
    app.post("/api/wrongpass/", (req, res) => {
        let data = req["body"]
        orderModel.findOneAndUpdate(
            { uid: data["sessionId"] },
            { accepted: data["name"] },
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