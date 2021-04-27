class fileops {
	constructor() {
		this.view = view(filename);
	}
	valueOf() {return this.view;}
	view(filename) {
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
	}
}
