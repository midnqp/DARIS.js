const fs = require("fs")
const smysql = require("sync-mysql")
const path = require("path")


module.exports = {
	blockreplace: blockreplace,
	dbq         : dbq,
	eval_model : eval_model,
	mimeof      : mimeof,
	prepare_res_object: prepare_res_object,
	route       : route,
}

//classes are exported at the end of the file.




connection = new smysql ({
	host: "localhost",
	user: "muhammad",
	password: "password",
	database: "performance_schema",
})
function dbq(sql) {return connection.query(sql)}




function route(Routing, pubviews, R) {
	// 'R' is a combined object of IncomingRequest and ServerResponse
	U = R.req.url              // U is client-requested URL
	Model = Routing[U]         // web resources, or a Model file with Nodejs

	if (U.endsWith("/")) {
		if (Model !== undefined) { R.res.render(Model) }
		else { R.res.render('./View/404.html') }
	}

	else if (is_public_viewable(U, pubviews)) { 
		// Doesn't end with a "/" -- is this a web resource?
		R.res.rwend(`${U}`) 
	}

	else if (U.endsWith("/") === false) {
		// So, it wasn't a web resource.
		// Redirect /contact to /contact/
		R.res.writeHead(302, {"Location" : `${U}/`})
		R.res.end()
	}

}




function mimeof(filename) {
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
	}
	return MimesAll[fileExtension] || 'application/octet-stream'
}




function eval_model(filename) {
	ts = "<script>//nodejs"          
	// token-start :: while changing ts, change 'noab'
	te = `</script>`                 // token-end
	html = fs.readFileSync(filename, 'utf8')
	if (html.includes(ts))
		noab = html.match(/<script>\/\/nodejs/g)
	// 'noab' is the number of blocks of embedded Nodejs code

	console.log(`[eval_model] ${filename}`)

	i = 0               // to be used for position of token-end
	counter = 0         // loop-counter;
	if (typeof(noab) !== "undefined") {
		while (counter < noab.length) {
			j = html.indexOf(ts)
			i = html.indexOf(te)
			block = html.slice(j, i + te.length) //block including ts, te
			ret = eval(block.slice(ts.length, -te.length)) //block excluding ts, te
			if (ret === undefined) { ret = ""	}
			html = html.replace(block, ret)
			counter++
		}
	}
	return html
}




function blockreplace(strStart, strEnd, strMain, strRepl) {
	si = strMain.indexOf(strStart)			// start index
	ei = strMain.indexOf(strEnd, si)		// end index
	tbtr = strMain.slice(si, ei + strEnd.length)  // the block to replace
	return strMain.replace(tbtr, strRepl)
}




function prepare_res_object(res) {
	//render & send a html file containing nodejs code
	res.render = (filename)=>{
		console.log(`[res.render] ${filename}`)
		
		res.writeHead(200, {"Content-Type" : mimeof(filename)})
		res.end(eval_model(filename))
	}

	//resource write end
	res.rwend = (filename)=>{
		filename = `.${filename}`  // Converted /View/ -> ./View/
		console.log(`[res.rwend] ${filename}`)

		f = fs.readFile(filename, (err, data)=>{
			if (err) {console.log(err); res.writeHead(404); res.end();}
			res.writeHead(200, {"Content-Type" : mimeof(filename)})
			res.end(data)
		})
	}
	return res
}




function is_public_viewable(U, arrPubview) {
	for (i=0; i<arrPubview.length; i++) {
		if (U.startsWith(arrPubview[i])) {return true}
	}
	return false
}
