document.write(`
	<style>:root {--nav-height:50px;}
	#logo-name:hover {background-color:#414141;}
	</style>

	<nav id="navigation" style="width:100%; height:var(--nav-height); background-color:black; color:white; top:0px; left:0px;position:fixed; z-index:2 !important;">	
		<a href="/" style="color:white; text-decoration:none;display:block; width:min-content;"><h1 id=logo-name style="width:min-content; font-size:25px; font-family:Mono;margin:0px 0px 0px 0px; padding:0px 0px 0px 0px; line-height:var(--nav-height);">&nbsp;HAMD.EVERYTHING</h1>

		<script>
		var navTitle = document.getElementById('logo-name');
		var dir = window.location.pathname.toUpperCase();	
		var a = dir.slice(0, dir.length-1).replaceAll("/", "&nbsp;>&nbsp;");
		navTitle.innerHTML = "&nbsp;HAMD.EVERYTHING"+a;

/*		nam = {
			'/daris/':'DARIS',
			'/zamya/':'ZAMYA',
			'/iqra/'"
		}; */

/*		if (dir.includes('/daris/')) { navTitle.innerHTML = "&nbsp;HAMD.EVERYTHING&nbsp;&gt;&nbsp;DARIS"; }
		else if (dir.includes('/zamya/')) { navTitle.innerHTML = "&nbsp;HAMD.EVERYTHING&nbsp;&gt;&nbsp;ZAMYA"; } */

		
		//a = dir.slice(0, dir.length-1).replaceAll("/", "&nbsp;>&nbsp;");
		//console.log(a);
		</script>
		</a>
	</nav>	
`);




/* Thanks `Firefox Changes` for teaching me `nth-child`

#navigation > h1:nth-child(1) {
  font-size: 18px;
  font-style: normal;
}
*/
