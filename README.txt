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





_______ DEVELOPMENT: GETTING STARTED  _______

[[ STEP 0 ] THE OPENING  ]


* This project implements a framework: Alhamd Vanilla (https://github.com/midnqp/alhamd-vanilla). There you can find materials to:
        -- architecture
        -- variable-naming, and coding styles

* Plans & progress of this project: https://github.com/users/midnqp/projects/1 

* Be sure to have fun contributing code here! Any contribution and constructive discussion is warmly welcome - this is an immensely paramount project.




[[ STEP 1 ]  SETTING UP MYSQL DATABASE FOR `DARIS.JS`  ]


You need to enable Auth_socket for MySQL. Then, execute(copy/paste) the following in MySQL shell to setup the DB:

```
create database `daris`;
alter user 'root'@'localhost' \
  identified with mysql_native_password \ 
  by 'Password@2';  #improve security at will !!

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


Do this only once: `$ npm i package.json`
To start server: `$ nodemon DarisMainServer.js`





_______ ADVISE _______

# [Recommended] vim-airline
# [Strongly Recommended] vim-youcompleteme (requires Vim 8.1.2269+)
# [Strongly Recommended] Enable autocompletion for Node.js syntax & your custom library: 
        $ npm i --save-dev @types/node
