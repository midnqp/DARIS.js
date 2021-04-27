lib = require("./lib.js")
console.log(lib.dbq("SHOW DATABASES;"))



//console.log(new lib.view("./__learn__").__PromiseReadFileAsync__());
p = new Promise((resl, rejc)=>{

resl(); rejc();
})

p.then(
	(value)=>{ console.log(value);  },
	(err)=>{ console.log(err); }
);
