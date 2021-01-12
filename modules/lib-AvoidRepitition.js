const MYSQL = require('mysql');


module.exports = {
	exec_mysql: function(sql, callback_func)	{
	/* Executes a MySQL query */
		var mysqlCreds = {
			host: "localhost",
			user: "root",
			password: "Password@2",
			database: "daris"
		};
		var connection = MYSQL.createConnection(mysqlCreds);
		connection.connect();

		connection.query(sql, (err, result) => {
			if (err) throw err;

			callback_func(result); 		// do whatever on the result
		});
		connection.end();
	},

	mime_type: function(fileExtension) {	
	/* Returns MIME-type for any file extension. */
		var mimes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'

				//add more at will, please
		};
		return mimes[fileExtension] || 'application/octet-stream';
	},
}
