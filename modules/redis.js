const config = require("config"),
	  cacheConfig = config.get("Application.cache"),
	  redis = require("redis"),
	  message = require("print-message")
global.cache = redis.createClient(cacheConfig)

module.exports = () => {
	cache.on("connect", () => {
		message(["[Redis] Połączono z pamięcią podręczną"], {
			border: false,
			color: "green"
		})
	})

	cache.on("reconnecting", () => {
		message(["[Redis] Trwa ponowne łączenie z pamięcią podręczną..."], {
			border: false,
			color: "yellow"
		})
	})

	cache.on("end", () => {
		message(["[Redis] Nie udało połączyć się z pamięcią podręczną!"], {
			border: false,
			color: "red"
		})
	})
}