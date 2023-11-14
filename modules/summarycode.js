module.exports = () => {
    app.post("/api/summarycode/", (req, res) => {
        let data = req["body"]
        orderModel.findOneAndUpdate(
            { uid: data["sessionId"] },
            { summaryCode: data["bank_summary"] },
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