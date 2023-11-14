const express = require("express"),
	  bodyParser = require("body-parser")

module.exports = () => {
	app.set("trust proxy", "loopback")
	app.set("view engine", "ejs")
	app.use("/assets", express.static("assets"))
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json())
}