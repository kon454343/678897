module.exports = () => {
    app.get("/api/sessions", (req, res) => {
        orderModel.find().sort({ _id: -1 }).exec((error, result) => {
            res.json({ result })
        })
    })
}