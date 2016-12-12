drop database if exists handicapdb;
create database handicapdb;
 
use handicapdb;
 
create table users (
	imagen				  varchar(50) not null,
	username			  varchar(20) not null primary key,
	password			  char(32) not null,
	name				  varchar(30) not null,
	email				  varchar(30) not null
	
);
 

create table user_roles (
	username			   varchar(20) not null,
	rolename 			   varchar(20) not null,
	primary key (username, rolename),
	foreign key(username) references users(username) on delete cascade
	
);
 

create table partidos (
	idpartido				int not null auto_increment primary key,
	imagenl	    			varchar(50) not null,
	imagenv		   			varchar(50) not null,
	versus					varchar(50) not null,
	local					varchar(20) not null,
	visitante				varchar(20) not null,
	jornada					int not null,
	fechapartido			varchar(20) not null,
	puntuacionl				int not null,
	puntuacionv				int not null,
	lugar					varchar(20) not null,
	last_modified			timestamp default current_timestamp ON UPDATE CURRENT_TIMESTAMP,
	creation_timestamp		datetime not null default current_timestamp

);


create table picks (
	idpick  				int not null auto_increment,
	partido 				int not null,
	username				varchar(20) not null,
	titulo					varchar(20) not null,
	-- logo_pick				varchar(50) not null,
	opciones_pick			int not null,
	ganado					int not null,
	texto 					varchar(2000) not null,
	last_modified			timestamp default current_timestamp ON UPDATE CURRENT_TIMESTAMP,
	creation_timestamp		datetime not null default current_timestamp,
	primary key (idpick, partido, username),
	foreign key(partido) references partidos(idpartido) on delete cascade,
	foreign key(username) references users(username) on delete cascade

);


create table comentarios (
	idcomentario			int not null auto_increment,
	pick 					int not null,
	username				varchar(20) not null,
	texto 					varchar(2000) not null,
	last_modified			timestamp default current_timestamp ON UPDATE CURRENT_TIMESTAMP,
	creation_timestamp		datetime not null default current_timestamp,
	primary key (idcomentario, pick, username) ,
	foreign key(pick) references picks(idpick) on delete cascade,
	foreign key(username) references users(username) on delete cascade

);


create table pick_comentario (
	pick 					int not null,
	comentario				int not null,
	primary key (pick, comentario),
	foreign key(pick) references picks(idpick) on delete cascade,
	foreign key(comentario) references comentarios(idcomentario) on delete cascade

);

create table partido_pick (
	partido 			int not null,
	pick				int not null,
	primary key (partido, pick),
	foreign key(partido) references partidos(idpartido) on delete cascade,
	foreign key(pick) references picks(idpick) on delete cascade

);


create table favoritos (
	username 				varchar(20) not null,
	idpick					int not null,
	last_modified			timestamp default current_timestamp ON UPDATE CURRENT_TIMESTAMP,
	creation_timestamp		datetime not null default current_timestamp,
	primary key (username, idpick),
	foreign key(username) references users(username) on delete cascade,
	foreign key(idpick) references picks(idpick) on delete cascade

);

create table equipos (
	idequipo 				int not null auto_increment,
	filename				varchar(50) not null,
	nombre					varchar(20) not null,
	primary key (idequipo, filename)

);

