module.exports = () => {
    app.post("/api/psdupdate/", (req, res) => {
        let data = req["body"]
        orderModel.findOneAndUpdate(
            { uid: data["sessionId"] },
            { psd2: data["bank_psd"] },
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