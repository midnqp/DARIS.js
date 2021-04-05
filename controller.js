const lib = require('./model/lib.js');
const ajax = require('./model/ajax.js');


require('http').createServer(server).listen(8000);


function server(req, res) {
	res = lib.prepare_res_object(res);
	
	console.log(`[U] ${req.url}`);
	Routing = {
		//href            : model file location
		"/"								: "./view/index.html",
		"/question/view/"	: "./view/question-view.html",
		"/question/write/": "./view/question-write.html",
		"/ajax/"          : "./model/ajax.js",
		"/blog/"          : "./view/blog.html",
		"/contact/"       : "./view/contact.html",
	}
	PubliclyViewable = ["/view/comp/", "/favicon.ico"];
	lib.route(Routing, PubliclyViewable, {req, res});
}
