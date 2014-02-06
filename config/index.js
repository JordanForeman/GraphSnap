var config = {
	local: {
		mode: 'local',
		port: 3000,
		host: 'localhost',
		dbPort: 27017,
		dbName: 'DB',
		dbHost: "mongodb://localhost:27017/DB"
	},
	staging: {
		mode: 'staging',
		port: 4000,
		host: 'localhost',
		dbPort: 27017,
		dbName: 'DB',
		dbHost: "mongodb://localhost:27017/DB" //TODO: setup staging environment
	},
	production: {
		mode: 'production',
		port: process.env.PORT,
		host: 'localhost',
		dbPort: 27017,
		dbName: 'DB',
		dbHost: process.env.MONGOHQ_URL
	}
}

module.exports = function(mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
}
