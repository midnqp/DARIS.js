(()=>{
document.onreadystatechange = ()=>{
if (document.readyState === "interactive") {

	//-------- <HEAD> FOR ALL HTML DOCS --------
	document.head.innerHTML = `
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>StacksMergeOne</title>


	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack-subset.css">
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&display=swap" rel="stylesheet">

	<link rel="stylesheet" href="/View/comp/common.css">
	` + document.head.innerHTML








	//---------THE FIRST <BODY> MANIPULATION--------
	// At this very moment, the <body> only contains from the Model files.
	// So, I just want to wrap the entire Model into only one <div id=app>.
	document.body.innerHTML = `<div id=app> <center>${document.body.innerHTML}</center> </div>`

	
	//--------- NAVIGATION PANEL --------
	// <nav> is being added even before <div id=app>. No problem.
	document.body.innerHTML = `
	<nav id=navigation>	
	<h1 id=logo-name>StacksMergeOne</h1>
	</nav>	
	` + document.body.innerHTML
	
	var navTitle = document.getElementById('logo-name')
	var currLoc = window.location.pathname.toUpperCase()
	var currLocGt= currLoc.slice(0, currLoc.length-1).replaceAll("/", " > ")
	navTitle.innerHTML = "&nbsp;StacksMergeOne" + currLocGt
}
}
})()
