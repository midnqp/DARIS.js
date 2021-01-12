const MYSQL = require('mysql');
const FS = require('fs');

const LIBAR = require('../lib-AvoidRepitition.js');

module.exports = {

	render_index_page: function(req, res) {
	/* Do everything you need to render the homepage here */

		// using "./" in respect to DarisMainServer.js
		FS.readFile('./daris/index.html', {encoding: 'utf-8'}, 
		(err, indexHTML) => {
			if (err) throw err;

			/* doing openly what frameworks do labelling as "render" */

			LIBAR.exec_mysql("SELECT * FROM daris_ques ORDER BY ques_up DESC", Render_Trending_Questions);

			function Render_Trending_Questions(sql_results) {
				var trQues = "<table><tbody>";		// Trending Questions
				for (let i=0; i < sql_results.length; i++) {
					trQues += "<tr><td>+" + sql_results[i].quesup + "&nbsp;&nbsp;</td>" + 
										"<td><a id=trQues href=/daris/question/?quesid=" + sql_results[i].quesid + ">" +
										sql_results[i].questitle + "</a></td></tr>";
				}
				trQues += "</tbody></table>";
				indexHTML = indexHTML.replace("{% Trending Questions %}", trQues);
				res.writeHead(200, {"Content-Type": "text/html"});
				res.end(indexHTML, "utf-8");
			}
		});		
	},

}
