lib = require("./model/lib.js")



//console.log(new lib.view("./__learn__").__PromiseReadFileAsync__());
p = new Promise((resl, rejc)=>{

resl(); rejc();
})

p.then(
	(value)=>{ console.log(value);  },
	(err)=>{ console.log(err); }
);
