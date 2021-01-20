
______    ___   ______   _____   _____         _       
|  _  \  / _ \  | ___ \ |_   _| /  ___|       (_)      
| | | | / /_\ \ | |_/ /   | |   \ `--.         _   ___ 
| | | | |  _  | |    /    | |    `--. \       | | / __|
| |/ /  | | | | | |\ \   _| |_  /\__/ /  _    | | \__ \
|___/   \_| |_/ \_| \_|  \___/  \____/  (_)   | | |___/
                                             _/ |      
                                            |__/                                                   

DARIS is an ONE-STOP questioning and answering platform for sharing knowledge, ...
			- and, not causing your eyes to strain
			- and, really behaving open-source & friendly -- for aspiring wizards (programmers)
			- and, for Grand Wizards needing info quick

In DARIS, a question does not have multiple answers. There is only one "perfect" and "most efficient" answer, and people merge their knowledge to that answer. If one believes his answer is perfect as well, he might add his. 



[ *ALHAMD ] - A vanilla-framework designed for those who "hate frameworks with a passion". This project is an implementation of that framework. (https://github.com/midnqp/alhamd-vanilla) 

[ *DARIS.concept ] - (https://github.com/midnqp/DARIS.concept) There you can find materials to:
                -- project code structure
                -- design principles
                -- any further detailed info
So, submit ideas/opinions there...just like ECMAScript, HTML, and W3C. Plans & progress of the project: https://github.com/users/midnqp/projects/1
         

Be sure to have fun contributing code here! Any contribution and constructive discussion is warmly welcome - this is an immensely paramount project.





_______ DEVELOPMENT: GETTING STARTED  _______

[[ STEP 1 ]  SETTING UP MYSQL DATABASE FOR `DARIS.JS`  ]


You need to enable Auth_socket for MySQL. Then, execute(copy/paste) the following in MySQL shell to setup the DB:

```
create database `daris`;
alter user 'root'@'localhost' \
	identified with mysql_native_password \ 
	by 'Password@2'; #improve security at will !!



use `daris`; create table `daris_ques`
(
    `ques_id` INT NOT NULL auto_increment,
    `ques_user_id` INT NOT NULL,
    `ques_title` VARCHAR(100) NOT NULL,
    `ques_desc` VARCHAR(1500) NOT NULL,
    `ques_up` INT NOT NULL,
    `ques_down` INT NOT NULL,
    `ques_time` DATETIME NOT NULL,
    PRIMARY KEY (`ques_id`)
) ENGINE = MyISAM;

use `daris`; create table `daris_ans`
(
    `ans_id` INT NOT NULL auto_increment,
    `ans_user_id` INT NOT NULL,
    `ans_desc` VARCHAR(1500) NOT NULL,
    `ans_up` INT NOT NULL,
    `ans_down` INT NOT NULL,
    `ans_time` DATETIME NOT NULL,
    PRIMARY KEY (`ans_id`)
) ENGINE = MyISAM;

use `daris`; create table `daris_users`
(
    `user_id` INT NOT NULL auto_increment,
    `asked_ques_id` VARCHAR NOT NULL,
    `answered_ans_id` VARCHAR NOT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE = MyISAM;

```

[[ STEP 2 ] FINALLY, STARTING SERVER ]


Do this once: `$ npm i package.json`
To start server: `$ nodemon DarisMainServer.js`





_______ `ALHAMD Dev Environment` (Aldenv) for Node.js _______

# [Recommended] vim-airline
# [Strongly Recommended] vim-youcompleteme (requires Vim 8.1.2269+)
# [Strongly Recommended] Enable autocompletion for Node.js syntax & your 
  custom library: `$ npm i --save-dev @types/node`





_______ CODE STYLE _______

(These are simple rules, so I put them here)


[[ Naming ]]
  vars --- no underscore, may have capital letter. Must be consistent.
            `let IndexHTML = ...;`
            `var trQues = ...;    // HTML of trending questions`
  func --- must have underscores, no capital letters. Must be consistent.
            `render_index_page: ()=>{...}`
            `render_questionview_page: ()=>{...}`
            `render_questionwrite_page: ()=>{...}`
            `exec_mysql(sql, callback_func) {...}`
  modules/libs --- may have underscore, ALL CAPS. Must be consistent.
            `const LIBAR = require('./modules/lib-avoidrepitition.js')`
            `const FS = require('fs');`
            `const DARIS_QUESTION_VIEW = require('./modules/rendering/question_view.js');`
  file names --- consistence & speciality
            `DarisMainServer.js`
            `daris/question/question_view.js`
            `daris/question/question_write.js` 
            `modules/lib-avoidrepitition.js`


[[ Each File ]]
  * Comment out the max line width, like this README, in the first line 
    of each file. Preferably 100 columns at max, and each line must not 
    be longer than that. Only for README: 70 columns, because longer 
    lines and indentations are gonna break.
  * No, do not split a feature/module too much. 
  * A file can be big, it "must do one thing, and do it properly"
          `daris/profile/profile.html`
          `daris/question/view.html`
          `daris/navbar.js`


[[ Ethics ]]
  * CONSISTENCY is much more important than SAVING FEW KEYSTROKES.
    And you can quote me on this.
  * "There should be (exactly) 1 way to do something - most efficiently." 
                                - Rob Pike (Golang creator; quote modified)

