const QS = require('querystring');
const FS = require('fs');
const PATH = require('path');
const MYSQL = require('url');

const LIBAR = require('./modules/lib-AvoidRepitition.js');
const DARIS_INDEX = require('./modules/ui_components/index.js');


require('http').createServer(Daris_Main_Server).listen(8000);



function Daris_Main_Server(req, res) {
	console.log(req.url);
	irequrl = req.url;		// indexible req url for FS, and HTML 
	if (filePath[0] !== ".") { filePath = `.${req.url}`; }


	if (req.url === "/") {
		DARIS_INDEX.Render_Index_Page(req, res);
	}


	else if (req.url.slice(0, 15) === "/question/write") {
		console.log("Write questions!");
	}


	else if (req.url.slice(0, ) === "/") { 
		FS.readFile(filePath, (err, fileContent)=>{
			
			else {
				fileExtension = String(PATH.extname(filePath)).toLowerCase();
				fileContentType = LIBAR.mime_type(fileExtension); //bcz: some MIME are 'text/css'
				//console.log(`${filePath}    ${fileContentType}    ${fileExtension}`);
				res.writeHead(200, {"Content-Type" : fileContentType});
				res.end(fileContent);
			}
		});
	}


	else { 
		/* When req.url isn't a path on the server... */

		res.writeHead(404);
		res.end("404 Not Found. Page doesn't exist!"); 
	}
}

