module.exports = {
	blockreplace: blockreplace,
	dbq: (sql)=>{return conn.query(sql);},
	mimeof: mime,
	route : route,
	prepare_res_object: prepare_res_object,
}
//classes are exported at the end of the file.




const fs = require("fs")
const smysql = require("sync-mysql")
const path = require("path")


function route(Routing, pubviews, reqres) {
	U = reqres.req.url       //U -> client-requested URL
	model = Routing[U]		    //web resources, or a model

	
	if (U.endsWith("/")===false) {
		if (is_public_viewable(U, pubviews)) {
			//Web resources from directory pubviews[] can be reliably sent
			if (U.startsWith("/view/")) {reqres.res.rwend(`.${U}`)}
			else {reqres.res.rwend(`${U}`)}
		}
		else if (U.startsWith("/view/")===false) {
			//Routes be '/contact/' not '/contact'
			reqres.res.writeHead(302, {"Location" : `${U}/`});
			reqres.res.end();
		}
	}
	//	else if (U.endsWith("/") && U.startsWith("/view/")===false) {
	else {
		//Finally a /route/ (not a web resource) to serve!

		//Routing exception handling
		//_index = Routing["/"];
		//if (_index !== undefined) { delete Routing["/"]; }
		//if (U === _index) {reqres.res.render('./view/index.html');}


		if (model !== undefined) { reqres.res.render(model);	}
		else if (model === undefined) { reqres.res.render('./view/404.html'); }
	}
}




class _view {
	constructor(filename) {
		this.filename = filename;
	}


	newpromise() {
		var p = new Promise();
	}


	__PromiseReadFileAsync__() {
		var prfa = promisify(fs.readFile);
		prfa(this.filename, 'utf8')
			.then((output)=>{return 123});
	}
	

	__view__() {
		var html = async ()=> {
			const file = await this.__PromiseReadFileAsync__;
			console.log(file);
		}
		html();
		var ts = "<%";
		var te = "%>";
		var i = 0;
		var counter = 0; //loop-counter;
		if (html.includes(ts)) {
			var noab = (html.match(eval(`/${ts}/g`))).length; 	//number of alhamd-blocks
			while (counter < noab) {
				var j = html.indexOf(ts);
				i = html.indexOf(te);
				var block = html.slice(j, i + ts.length);
				var ret = eval(block.slice(ts.length, -te.length)); //block excluding ts, te
				if (ret === undefined) { ret = "";	}
				html = html.replace(block, ret);
				counter++;
			}
		}
		return html;
	}
}




var conn = new smysql ({
	host: "localhost",
	user: "muhammad",
	password: "password",
	database: "daris",
});




function mime(filename) {
	fileExtension = String(path.extname(filename)).toLowerCase();
	var MimesAll = {
			'.html': 'text/html',
			'.css' : 'text/css',
			'.md'  : 'text/markdown',
			'.ico' : 'image/x-icon',
			'.png' : 'image/png',
			'.jpg' : 'image/jpg',
			'.gif' : 'image/gif',
			'.svg' : 'image/svg+xml',

			'.wav' : 'audio/wav',
			'.mp4' : 'video/mp4',

			'.js':   'application/javascript',
			'.json': 'application/json',
			'.woff': 'application/font-woff',
			'.ttf' : 'application/font-ttf',
			'.eot' : 'application/vnd.ms-fontobject',
			'.otf' : 'application/font-otf',
			'.wasm': 'application/wasm'
	};
	return MimesAll[fileExtension] || 'application/octet-stream';
}




/*function view(filename) {
	// Given a HTML filename containing Alhamdjs codeblocks,
	// Reads the file, and renders the Node.js code embedded within.
	//
	// Returns contents of the file.
	
	html = fs.readFileSync(filename, 'utf8');
	ts = "<%";
	te = "%>";
	i = 0;
	counter = 0; //loop-counter;
	if (html.includes(ts)) {
		noab = (html.match(eval(`/${ts}/g`))).length; 	//number of alhamd-blocks
		while (counter < noab) {
			j = html.indexOf(ts);
			i = html.indexOf(te);
			block = html.slice(j, i + ts.length);
			ret = eval(block.slice(ts.length, -te.length)); //block excluding ts, te
			if (ret === undefined) { ret = "";	}
			html = html.replace(block, ret);
			counter++;
		}
	}
	return html;
}*/




function blockreplace(strStart, strEnd, strMain, strRepl) {
	si = strMain.indexOf(strStart);			// start index
	ei = strMain.indexOf(strEnd, si);		// end index
	tbtr = strMain.slice(si, ei + strEnd.length);  // the block to replace
	return strMain.replace(tbtr, strRepl);
}




function prepare_res_object(res) {
	//render a html file containing nodejs code
	res.render = function (filename) {
		console.log(`[res.render] ${filename}`);
		res.writeHead(200, {"Content-Type" : mime(filename)});
		res.end(new _view(filename).__view__(), 'utf8');
	}


	//resource write end
	res.rwend = function (filename) {
		console.log(`[res.rwend] ${filename}`);
		try {
			f = fs.readFileSync(filename, 'utf8');
			res.writeHead(200, {"Content-Type" : mime(filename)});
			res.end(f, 'utf8');
		}
		catch(err) {
			//console.log(err);
			res.writeHead(404); 
			res.end();
		}
	}


	return res;
}




function is_public_viewable(U, arrPubview) {
	for (i=0; i<arrPubview.length; i++) {
		if (U.startsWith(arrPubview[i])) {return true;}
	}
	return false;
}




module.exports.view = _view;
