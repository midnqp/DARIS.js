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

	else {
		filePath = req.url;
		if (filePath[0] !== ".") { filePath = `.${req.url}`; }
		FS.readFile(filePath, (err, fileContent)=>{
			if (err) {	
			/*	What happens when req.url neither is a path,
					nor a file on the server. */
				res.writeHead(400);
				res.end();
			};


			/*	Biggest hack of this framework's server: 
					Allowing to read any other required files.	*/	
			fileExtension = String(PATH.extname(filePath)).toLowerCase();
			fileContentType = LIBAR.mime_type(fileExtension); //bcz: some MIME are 'text/css'
			console.log(`${filePath}    ${fileContentType}    ${fileExtension}`);
			res.writeHead(200, {"Content-Type" : fileContentType});
			res.end(fileContent);		
		});
	}
	//console.log(req.url);
}
