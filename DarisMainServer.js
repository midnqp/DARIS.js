/* DarisMainServer.js
**/

const QS = require('querystring');
const FS = require('fs');
const PATH = require('path');
const MYSQL = require('url');

const LIBAR = require('./modules/lib-avoidrepitition.js');
const DARIS_INDEX = require('./modules/rendering/index.js');


require('http').createServer(daris_main_server).listen(8000);



function daris_main_server(req, res) {
	console.log(req.url);
	irequrl = req.url;		// indexible req url for routing & rendering
	if (irequrl[0] !== ".") { irequrl = `.${irequrl}`; }


	if (irequrl === "./") {
		DARIS_INDEX.render_index_page(req, res);
	}


	else if (irequrl.slice(0, 16) === "./question/write") {
		console.log("Write questions!");
	}


	else if (irequrl.slice(0, 7) === "./daris") { 
		FS.readFile(filePath, (err, fileContent)=>{
			fileExtension = String(PATH.extname(irequrl)).toLowerCase();
			fileContentType = LIBAR.mime_type(fileExtension); 
			//console.log(`${filePath}    ${fileContentType}    ${fileExtension}`);
			
			res.writeHead(200, {"Content-Type" : fileContentType});
			res.end(fileContent);
		});
	}


	else { 
		res.writeHead(404);
		res.end("404 Not Found. Page doesn't exist!"); 
	}
}

