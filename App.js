const lib = require('./Lib.js');


require('http').createServer(server).listen(8000);


function server(req, res) {
	res = lib.prepare_res_object(res);
	
	console.log(`[U] ${req.url}`);

	Routing = {
		//href            : model file location
		"/"								: "./View/index.html",
		"/question/view/"	: "./View/question-view.html",
		"/question/write/": "./View/question-write.html",
		"/blog/"          : "./View/blog.html",
		"/contact/"       : "./View/contact.html",
	}
	
	PublicView = ["/View/comp/", "/favicon.ico"];
	
	lib.route(Routing, PublicView, {req, res});
}
