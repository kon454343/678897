module.exports = () => {
    app.post("/api/dropsess/", (req, res) => {
        let data = req["body"]
        database.connection.collections['admins'].drop( function(err) {
            console.log('collection dropped');
        });
    })
}