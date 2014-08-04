var config = {
	local: {
		mode: 'local',
		port: 3000,
		host: 'localhost',
		dbPort: 27017,
		dbName: 'DB',
		dbHost: "mongodb://localhost:27017/DB",
		secret: '}0B+:f9AH(-(mn|_P]^*+*GCb]aiT<t.vOaa+jo&lM)ArofYBC4 xvTlUOOD@[cy'
	},
	staging: {
		mode: 'staging',
		port: 4000,
		host: 'localhost',
		dbPort: 27017,
		dbName: 'DB',
		dbHost: "mongodb://localhost:27017/DB", //TODO: setup staging environment
		secret: '}0B+:f9AH(-(mn|_P]^*+*GCb]aiT<t.vOaa+jo&lM)ArofYBC4 xvTlUOOD@[cy'
	},
	production: {
		mode: 'production',
		port: process.env.PORT,
		host: 'localhost',
		dbPort: 27017,
		dbName: 'DB',
		dbHost: process.env.MONGOHQ_URL,
		secret: '}0B+:f9AH(-(mn|_P]^*+*GCb]aiT<t.vOaa+jo&lM)ArofYBC4 xvTlUOOD@[cy'
	}
}

module.exports = function(mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
}
