/* index.js																																												 #
 * Do everything you need to render the homepage here 
 */


const MYSQL = require('mysql');
const FS = require('fs');

const LIBAR = require('../lib-avoidrepitition.js');

module.exports = {

	render_index_page: (req, res)=>{	
		FS.readFile('./daris/index/index.html', {encoding: 'utf-8'}, (err, indexHTML) => {
			if (err) throw err;

			LIBAR.exec_mysql("SELECT * FROM daris_ques ORDER BY ques_up DESC", render_trending_questions);

			function render_trending_questions(sql_results) {
				var trQues = "<table><tbody>";		// Trending Questions
				for (let i=0; i < sql_results.length; i++) {
					trQues += "<tr><td>+" + sql_results[i].quesup + "&nbsp;&nbsp;</td>"
								 + "<td><a id=trQues href=/daris/question/?quesid=" + sql_results[i].quesid + ">" 
								 + sql_results[i].questitle + "</a></td></tr>";
				}
				trQues += "</tbody></table>";
				global.DARISindexHTML = indexHTML.replace("{% Trending Questions %}", trQues);
			}


			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(global.DARISindexHTML, "utf-8");
		});		
	},

}
