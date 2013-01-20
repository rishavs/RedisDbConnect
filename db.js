
module.exports = _redisDb = (function() {
	
	var redis = require('redis'); 
	var config = require('../config');
	console.log("test");
	var dbConnection = redis.createClient(config.db.port, config.db.host, {no_ready_check: true});
	dbConnection.auth(config.db.authKey, function() {
		console.log("Authenticated!");
	});
	
	dbConnection.on('connect'     , log('connect'));
	dbConnection.on('ready'       , log('ready'));
	dbConnection.on('reconnecting', log('reconnecting'));
	dbConnection.on('idle'        , log('idle...'));
	dbConnection.on('end'         , log('end'));
	dbConnection.on('error'       , log('error'));

	function log(type) {
		return function() {
			console.log(type, arguments);
		}
	}

	var getValue = function() {
		dbConnection.get("hello", function (err, reply) {
			console.log(reply.toString());
			return reply.toString()
		});
		console.log(val);
		return val
		};
	
    return {
		getValue: getValue
	}
})();