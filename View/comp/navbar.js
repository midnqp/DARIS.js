	<nav id="navigation" style="width:100%; height:var(--nav-height); background-color:black; color:white; top:0px; left:0px;position:fixed; z-index:2 !important;">	
		<a href="/" style="color:white; text-decoration:none;display:block; width:min-content;"><h1 id=logo-name style="width:min-content; font-size:25px; font-family:Mono;margin:0px 0px 0px 0px; padding:0px 0px 0px 0px; line-height:var(--nav-height);">&nbsp;HAMD.EVERYTHING</h1>

		<script>
		var navTitle = document.getElementById('logo-name');
		var dir = window.location.pathname.toUpperCase();	
		var a = dir.slice(0, dir.length-1).replaceAll("/", "&nbsp;>&nbsp;");
		navTitle.innerHTML = "&nbsp;DARIS"+a;
	
		</script>
		</a>
	</nav>	
