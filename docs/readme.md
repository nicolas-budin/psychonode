


# Introduction

Psychonode is a implementation of the experiment process described in 

Karpicke, J. D. (2009). Metacognitive control and strategy selection: Deciding to practice retrieval during learning. _Journal of Experimental Psychology_: General, 138(4), 469–486. https://doi.org/10.1037/a0017341


The pdf of the paper: http://memory.psych.purdue.edu/downloads/2009_Karpicke_JEPGeneral.pdf

# Tech stuff

## Stack

* rdbms : https://www.sqlitetutorial.net
* ORM : https://sequelize.org/
* mvc / router : https://expressjs.com/
* authentication : http://www.passportjs.org/
* css : https://getbootstrap.com/docs/4.5

## Install

as root: install node and git

* yum install npm.x86_64
* yum install git-all.noarch
 
as user : get code, install and run

* mkdir -p rep/git
* cd rep/git/
* git clone https://github.com/nicolas-budin/psychonode.git
* cd psychonode/
* npm install

## Run

* npm start

## Test
 
* npm test
* curl localhost:3000/

