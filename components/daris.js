module.exports = {
	index:function(response, request, fs, mysqlconn, content)  { 
		fs.readFile('./daris/index.html', {encoding: 'utf-8'} ,function(error, content) {
      if (error) throw error;
      mysqlconn("select * from daris_ques order by ques_up desc", (result)=>{
        var trques = "<table><tbody>";
        for(let i=0; i<result.length; i++) {
          trques+="<tr><td>+"+result[i].quesup+"&nbsp;&nbsp;</td><td><a id=trques href=/daris/question/?quesid="+result[i].quesid+">"+result[i].questitle+"</a></td></tr>";
        }
      trques+="</tbody></table>";
			content = content.replace('[trending_questions]', trques);
      response.writeHead(200, {"Content-Type": "text/html"});
      response.end(content, 'utf-8');
      });
    });
	 
										}, //daris.index function




	write: function(fs, response, request, qs, mysqlconn) {
		fs.readFile('./daris/write.html', (err, content)=>{
			if (err) throw err;
			response.end(content);
		});
		if (request.method === "POST") {
			let body = '';
      request.on('data', function(data) { body+=data; });
      request.on('end', function() {
        let post = qs.parse(body);
        let sql = "insert into `daris_ques` (`ques`, `questitle`, `quesup`, `quesdown`, `quessubmit`, `qs_userid`) values ("+mysql.escape(post.ques)+", "+mysql.escape(post.questitle)+", 0, 0, NOW(),0)";
        mysqlconn(sql, (result)=>{ console.log("SQL done successfully!"); }); 
      });

			response.statusCode=302; //redirection
			response.setHeader("Location", "/");
			response.end();
		}
	}, //daris.write function




  writeans: function(fs, response, request, mysqlconn) {
    let body = '';
    request.on('data', (data)=>{body+=data});
    request.on('end', ()=>{
      let ans = qstr.parse(body)['ans'];
      let quesid = qstr.parse(url.parse(request.url).query)['quesid'];
      mysqlconn("insert into daris_ans (ans, anssubmit, quesid) values ("+mysql.escape(ans)+", NOW(), "+quesid+")", (result)=>{console.log('OKA answer submitted.');
      });
    });
  }, //daris.writeans




	question: function (fs, response, request, mysqlconn) {
		fs.readFile('./daris/question.html',{encoding: 'utf-8'}, function(error, questionHTML){
			var query = qstr.parse(url.parse(request.url).query);
			console.log("queryis : "+url.parse(request.url).query);

			mysqlconn("select * from daris_ques where quesid="+query['quesid'], (question)=> {
				questionHTML = questionHTML.replace("[questitle]", question[0].questitle);
				

				mysqlconn("select * from daris_ans where quesid="+query['quesid'], (answers)=> {
					let answersAll = '<div id=answers_all>';
					
					for (i=0; i<answers.length; i++) {
						var answerSingle = '<div class=container_answer id=contAns'+i+'><section id=answer'+i+' style="margin:0px 0px 4px 0px; background-color:black; color:white; height:auto; width:50rem;" >';
						var answerText = answers[i].ans;
						answerText = answerText.replace(/\r\n/g, '<br>');
						//answerText = answerText.replace('<code>', '<div class=answers_code style="height:auto; width:auto; "><code>');
						answerSingle += answerText+'</section>';
						answerSingle += '<span style="background-color:#ffff9a; font-size:12px;">'+TDF(answers[i].anssubmit)+'</span>&nbsp;&nbsp;&nbsp;<input id=edit'+i+' class=no-padmarg type=button value=Edit onclick=onclick_edit(this);><br><br><br>';

						answerSingle += '</div>';
						answersAll += answerSingle;
					}

					questionHTML = questionHTML.replace("[answer]", answersAll+'</div>');
					respond(error, response, questionHTML);
					console.log(answers[0]);
				});
			});	

		});
	}, //daris.question function
} //MODULE.EXPORT
                    
//CUSTOM FUNCTIONS AND VARIABLES

var qstr = require('querystring');
var url = require('url');
var mysql = require('mysql');

function respond (error, response, thing) {
  if (error) throw error;
  response.end(thing);
}

function TDF (td) {
	td = new Date(td);
	format_options = {year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'};
	return td.toLocaleString('en-us', format_options);

}

