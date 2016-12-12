drop user 'handicap'@'localhost';
create user 'handicap'@'localhost' identified by 'handicap'; 
grant all privileges on handicapdb.* to 'handicap'@'localhost';
flush privileges;