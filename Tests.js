lib = require("./Lib.js")
a = lib.dbq("SHOW DATABASES")
console.log(a)



//console.log(new lib.view("./__learn__").__PromiseReadFileAsync__());
p = new Promise((resl, rejc)=>{

resl(); rejc();
})

p.then(
	(value)=>{ console.log(value);  },
	(err)=>{ console.log(err); }
);
