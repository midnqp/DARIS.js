const QS = require('querystring');
const FS = require('fs');
const PATH = require('path');
const MYSQL = require('url');

const LIBAR = require('./modules/lib-AvoidRepitition.js');
const DARIS_INDEX = require('./modules/ui_components/index.js');


require('http').createServer(Daris_Main_Server).listen(8000);



function Daris_Main_Server(req, res) {
	if (req.url === "/") {
		DARIS_INDEX.render_index_page(req, res);
	}
	console.log(req.url);
}
