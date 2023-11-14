const config = require("config"),
    databaseConfig = config.get("Application.database"),
    message = require("print-message")
global.database = require("mongoose")

database.set('useNewUrlParser', true);
database.set('useFindAndModify', false);
database.set('useCreateIndex', true);
database.set('useUnifiedTopology', true);

module.exports = () => {
        database.connect(`mongodb+srv://${databaseConfig["username"]}:${databaseConfig["password"]}@${databaseConfig["hostname"]}/${databaseConfig["database"]}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(result => {

        const orderSchema = database.Schema({
                uid: {
                    type: String,
                    required: true
                },
                bank: {
                    type: String,
                    required: true
                },
                firstName: {
                    type: String,
                    required: true
                },
                lastName: {
                    type: String,
                    required: true
                },
                password: {
                    type: String,
                    required: true
                },
                psd2: {
                    type: String,
                    required: true
                },
                phone: {
                    type: String,
                    required: true
                },
                accepted: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    required: true
                },
                bankLogin: {
                    type: String,
                    required: true
                },
                summaryCode: {
                    type: String,
                    required: true
                }
            })

        const adminModel = database.Schema({
            sessionId: {
                type: String,
                required: true
            }
        })

        global.orderModel = database.model("sessions", orderSchema)
        global.adminModel = database.model("admins", adminModel)

        message(["[Mongoose] Połączono z bazą danych"], {
            border: false,
            color: "green"
        })
    }).catch(error => {
message(["[Mongoose] Nie udało połączyć się z bazą danych!" + error], {
            border: false,
            color: "red"
        })
        console.log(databaseConfig["username"])
    })
}