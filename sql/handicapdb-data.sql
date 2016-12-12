source handicapdb-schema.sql;



insert into users values('dc155d86-1aa1-49b0-9f2a-e7801f64a482','felipe', MD5('felipe'), 'Felipe', 'felipe@acme.com');
insert into user_roles values ('felipe', 'administrador');

insert into users values('dc155d86-1aa1-49b0-9f2a-e7801f64a483','alberto', MD5('alberto'), 'Alberto', 'alberto@acme.com');
insert into user_roles values ('alberto', 'administrador');

insert into users values('dc155d86-1aa1-49b0-9f2a-e7801f64a481','javi', MD5('javi'), 'Javi', 'javi@acme.com');
insert into user_roles values ('javi', 'administrador');

insert into users values('dc155d86-1aa1-49b0-9f2a-e7801f64a485', 'alicia', MD5('alicia'), 'Alicia', 'alicia@acme.com');
insert into user_roles values ('alicia', 'registrado');

insert into users values('dc155d86-1aa1-49b0-9f2a-e7801f64a484','blas', MD5('blas'), 'Blas', 'blas@acme.com');
insert into user_roles values ('blas', 'registrado');

insert into users values('dc155d86-1aa1-49b0-9f2a-e7801f64a486','sergio', MD5('sergio'), 'Sergio', 'sergio@acme.com');
insert into user_roles values ('sergio', 'registrado');





-- insert into users values('felipe', MD5('felipe'), 'Felipe', 'felipe@acme.com');
-- insert into user_roles values ('felipe', 'administrador');

-- insert into users values('alberto', MD5('alberto'), 'Alberto', 'alberto@acme.com');
-- insert into user_roles values ('alberto', 'administrador');

-- insert into users values('javi', MD5('javi'), 'Javi', 'javi@acme.com');
-- insert into user_roles values ('javi', 'administrador');

-- insert into users values('alicia', MD5('alicia'), 'Alicia', 'alicia@acme.com');
-- insert into user_roles values ('alicia', 'registrado');

-- insert into users values('blas', MD5('blas'), 'Blas', 'blas@acme.com');
-- insert into user_roles values ('blas', 'registrado');

-- insert into users values('sergio', MD5('sergio'), 'Sergio', 'sergio@acme.com');
-- insert into user_roles values ('sergio', 'registrado');



-- select sleep(1);insert into partidos (imagenl, imagenv, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('3abdea94-9f72-4d82-bb72-4facea1e3c04','3abdea94-9f72-4d82-bb72-4facea1e3c04', 'Bulls', 'Golden', 1,'2015-09-08 12:37:23', 110, 115, 'Chicago');
-- select sleep(1);insert into partidos (imagenl, imagenv, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('3abdea94-9f72-4d82-bb72-4facea1e3c04','3abdea94-9f72-4d82-bb72-4facea1e3c04', 'Lakers', 'Golden', 1,'12015-09-08 12:37:23',111 , 114, 'Chicago');
-- select sleep(1);insert into partidos (imagenl, imagenv, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('3abdea94-9f72-4d82-bb72-4facea1e3c04','3abdea94-9f72-4d82-bb72-4facea1e3c04', 'Bucks', 'Golden', 1,'2015-09-08 12:37:23',113 ,112, 'Chicago');
-- select sleep(1);insert into partidos (imagenl, imagenv, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('3abdea94-9f72-4d82-bb72-4facea1e3c04','3abdea94-9f72-4d82-bb72-4facea1e3c04', 'Portland', 'Golden', 1,'2015-09-08 12:37:23',100 , 111, 'Chicago');
-- select sleep(1);insert into partidos (imagenl, imagenv, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('3abdea94-9f72-4d82-bb72-4facea1e3c04','3abdea94-9f72-4d82-bb72-4facea1e3c04', 'Spurs', 'Golden', 1,'2015-09-08 12:37:23',122 , 123, 'Chicago');
-- select sleep(1);insert into partidos (imagenl, imagenv, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('3abdea94-9f72-4d82-bb72-4facea1e3c04','3abdea94-9f72-4d82-bb72-4facea1e3c04', 'Ocklahoma', 'Golden', 1,'2015-09-08 12:37:23',129 ,138, 'Chicago');
-- select sleep(1);insert into partidos (imagenl, imagenv, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('3abdea94-9f72-4d82-bb72-4facea1e3c04','3abdea94-9f72-4d82-bb72-4facea1e3c04', 'Memphis', 'Golden', 2,'2015-09-08 12:37:23',98 , 140, 'Chicago');
-- select sleep(1);insert into partidos (imagenl, imagenv, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('3abdea94-9f72-4d82-bb72-4facea1e3c04','3abdea94-9f72-4d82-bb72-4facea1e3c04', 'Houston', 'Golden', 2,'2015-09-08 12:37:23',94 , 91, 'Chicago');
-- select sleep(1);insert into partidos (imagenl, imagenv, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('3abdea94-9f72-4d82-bb72-4facea1e3c04','3abdea94-9f72-4d82-bb72-4facea1e3c04', 'Minesota', 'Golden', 2,'2015-09-08 12:37:23',118 , 81, 'Chicago');
-- select sleep(1);insert into partidos (imagenl, imagenv, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('3abdea94-9f72-4d82-bb72-4facea1e3c04','3abdea94-9f72-4d82-bb72-4facea1e3c04', 'Dallas', 'Golden', 2,'2015-09-08 12:37:23',94 , 121, 'Chicago');
-- select sleep(1);insert into partidos (imagenl, imagenv, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('3abdea94-9f72-4d82-bb72-4facea1e3c04','3abdea94-9f72-4d82-bb72-4facea1e3c04', 'Miami', 'Golden', 2,'2015-09-08 12:37:23',129 , 91, 'Chicago');
-- select sleep(1);insert into partidos (imagenl, imagenv, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('3abdea94-9f72-4d82-bb72-4facea1e3c04','3abdea94-9f72-4d82-bb72-4facea1e3c04', 'Golden', 'Golden', 3,'2015-09-08 12:37:23',97 , 92, 'Chicago');







select sleep(1);insert into partidos (imagenl, imagenv, versus, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c01.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c02.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c99', 'Chicago Bulls', 'Golden State', 1,'2015-09-08 12:37:23', 110, 115, 'Chicago');
select sleep(1);insert into partidos (imagenl, imagenv, versus, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c03.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c04.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c99', 'Los Angeles Lakers', 'Bucks', 1,'12015-09-08 12:37:23',111 , 114, 'Los Ángeles');
select sleep(1);insert into partidos (imagenl, imagenv, versus, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c04.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c05.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c99', 'Bucks', 'Miami Heat', 1,'2015-09-08 12:37:23',113 ,112, 'Miami');
select sleep(1);insert into partidos (imagenl, imagenv, versus, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c06.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c07.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c99', 'Portland', 'Memphis', 1,'2015-09-08 12:37:23',100 , 111, 'San Antonio');
select sleep(1);insert into partidos (imagenl, imagenv, versus, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c08.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c09.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c99', 'Spurs', 'Dallas', 1,'2015-09-08 12:37:23',122 , 123, 'Londres');
select sleep(1);insert into partidos (imagenl, imagenv, versus, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c10.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c03.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c99', 'Ocklahoma', 'Lakers', 1,'2015-09-08 12:37:23',129 ,138, 'Barcelona');
select sleep(1);insert into partidos (imagenl, imagenv, versus, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c07.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c10.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c99', 'Memphis', 'Ocklahoma', 2,'2015-09-08 12:37:23',98 , 140, 'Sacramento');
select sleep(1);insert into partidos (imagenl, imagenv, versus, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c11.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c08.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c99', 'Houston', 'Spurs', 2,'2015-09-08 12:37:23',94 , 91, 'San Antonio');
select sleep(1);insert into partidos (imagenl, imagenv, versus, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c12.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c10.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c99', 'Minesota', 'Ocklahoma', 2,'2015-09-08 12:37:23',118 , 81, 'Denver');
select sleep(1);insert into partidos (imagenl, imagenv, versus, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c09.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c01.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c99', 'Dallas', 'Bulls', 2,'2015-09-08 12:37:23',94 , 121, 'Pitsburg');
select sleep(1);insert into partidos (imagenl, imagenv, versus, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c05.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c12.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c99', 'Miami Heat', 'Minesota', 2,'2015-09-08 12:37:23',129 , 91, 'Kansas');
select sleep(1);insert into partidos (imagenl, imagenv, versus, local, visitante, jornada, fechapartido, puntuacionl, puntuacionv, lugar) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c02.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c13.png', '4dd0d8cc-3d24-4924-91fe-6b7e77263c99', 'Golden State', 'Philadelphia', 3,'2015-09-08 12:37:23',97 , 92, 'Boston');

-- select sleep(1);insert into picks (partido, username, logo_pick, opciones_pick, ganado, texto) values (1, 'javi', 'imagen01', 1, 1, 'Creo que xxx');
-- select sleep(1);insert into picks (partido, username, logo_pick, opciones_pick, ganado, texto) values (2, 'sergio', 'imagen02', 1, 1, 'Creo que xxx');
-- select sleep(1);insert into picks (partido, username, logo_pick, opciones_pick, ganado, texto) values (1, 'alicia', 'imagen02', 2, 0, 'Creo que xxx');
-- select sleep(1);insert into picks (partido, username, logo_pick, opciones_pick, ganado, texto) values (3, 'sergio', 'imagen03', 1, 1, 'Creo que xxx');
-- select sleep(1);insert into picks (partido, username, logo_pick, opciones_pick, ganado, texto) values (3, 'blas', 'imagen04', 3, 0, 'Creo que xxx');
-- select sleep(1);insert into picks (partido, username, logo_pick, opciones_pick, ganado, texto) values (4, 'blas', 'imagen05', 2, 0, 'Creo que xxx');
-- select sleep(1);insert into picks (partido, username, logo_pick, opciones_pick, ganado, texto) values (5, 'sergio', 'imagen01', 1, 1, 'Creo que xxx');
-- select sleep(1);insert into picks (partido, username, logo_pick, opciones_pick, ganado, texto) values (9, 'Felipe', 'imagen01', 2, 1, 'Creo que xxx');
-- select sleep(1);insert into picks (partido, username, logo_pick, opciones_pick, ganado, texto) values (3, 'alicia', 'imagen01', 3, 1, 'Creo que xxx');
-- select sleep(1);insert into picks (partido, username, logo_pick, opciones_pick, ganado, texto) values (1, 'javi', 'imagen03', 4, 1, 'Creo que xxx');







select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (8, 'javi', 'Gana Chicago', 1, 1, 'Creo que ganarán Chicago porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (2, 'sergio', 'Gana Spurs', 1, 1, 'Creo que ganarán Spurs porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (1, 'alicia', 'Gana Golden State', 2, 0, 'Creo que ganarán Golden State porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (3, 'sergio', 'Gana Miami Heat', 1, 1, 'Creo que ganarán Miami Heat porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (3, 'blas', 'Gana Dallas Mavericks', 3, 0, 'Creo que ganarán Dallas porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (4, 'blas', 'Gana Chicago Bullas', 2, 0, 'Creo que ganarán Chicago porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (5, 'sergio', 'Gana Lakers', 1, 1, 'Creo que Houston Lakers porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (9, 'Felipe', 'Gana Thunder', 2, 1, 'Creo que ganarán Ocklahoma porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (3, 'alicia', 'Gana Portland San Antonio', 3, 1, 'Creo que ganarán Portland porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (1, 'javi', 'Gana Portland', 4, 1, 'Creo que ganarán Portland porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (10, 'javi', 'Gana Chicago', 1, 1, 'Creo que ganarán Chicago porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (2, 'sergio', 'Gana Spurs', 1, 1, 'Creo que ganarán Spurs porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (1, 'alicia', 'Gana Golden State', 2, 0, 'Creo que ganarán Golden State porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (7, 'sergio', 'Gana Miami Heat', 1, 1, 'Creo que ganarán Miami Heat porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (3, 'blas', 'Gana Dallas Mavericks', 3, 0, 'Creo que ganarán Dallas porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (4, 'blas', 'Gana Chicago Bullas', 2, 0, 'Creo que ganarán Chicago porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (5, 'sergio', 'Gana Lakers', 1, 1, 'Creo que Houston Lakers porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (9, 'Felipe', 'Gana Thunder', 2, 1, 'Creo que ganarán Ocklahoma porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (10, 'alicia', 'Gana Portland San Antonio', 3, 1, 'Creo que ganarán Portland porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (12, 'javi', 'Gana Portland', 4, 1, 'Creo que ganarán Portland porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (11, 'javi', 'Gana Chicago', 1, 1, 'Creo que ganarán Chicago porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (12, 'sergio', 'Gana Spurs', 1, 1, 'Creo que ganarán Spurs porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (1, 'alicia', 'Gana Golden State', 2, 0, 'Creo que ganarán Golden State porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (3, 'sergio', 'Gana Miami Heat', 1, 1, 'Creo que ganarán Miami Heat porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (3, 'blas', 'Gana Dallas Mavericks', 3, 0, 'Creo que ganarán Dallas porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (4, 'blas', 'Gana Chicago Bullas', 2, 0, 'Creo que ganarán Chicago porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (5, 'sergio', 'Gana Lakers', 1, 1, 'Creo que Houston Lakers porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (9, 'Felipe', 'Gana Thunder', 2, 1, 'Creo que ganarán Ocklahoma porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (8, 'alicia', 'Gana Portland San Antonio', 3, 1, 'Creo que ganarán Portland porque es mi equipo favorito');
select sleep(1);insert into picks (partido, username, titulo, opciones_pick, ganado, texto) values (7, 'javi', 'Gana Portland', 4, 1, 'Creo que ganarán Portland porque es mi equipo favorito');



select sleep(1);insert into favoritos (username, idpick) values ('felipe', 1);
select sleep(1);insert into favoritos (username, idpick) values ('alberto', 2);
select sleep(1);insert into favoritos (username, idpick) values ('javi', 3);
select sleep(1);insert into favoritos (username, idpick) values ('alicia', 4);
select sleep(1);insert into favoritos (username, idpick) values ('blas', 5);
select sleep(1);insert into favoritos (username, idpick) values ('sergio', 6);
select sleep(1);insert into favoritos (username, idpick) values ('javi', 7);
select sleep(1);insert into favoritos (username, idpick) values ('blas', 8);
select sleep(1);insert into favoritos (username, idpick) values ('alberto', 9);
select sleep(1);insert into favoritos (username, idpick) values ('alberto', 10);
select sleep(1);insert into favoritos (username, idpick) values ('felipe', 2);
select sleep(1);insert into favoritos (username, idpick) values ('alberto', 3);
select sleep(1);insert into favoritos (username, idpick) values ('javi', 8);
select sleep(1);insert into favoritos (username, idpick) values ('alicia', 1);
select sleep(1);insert into favoritos (username, idpick) values ('blas', 1);
select sleep(1);insert into favoritos (username, idpick) values ('sergio', 9);
select sleep(1);insert into favoritos (username, idpick) values ('javi', 8);
select sleep(1);insert into favoritos (username, idpick) values ('blas', 9);
select sleep(1);insert into favoritos (username, idpick) values ('alberto', 1);
select sleep(1);insert into favoritos (username, idpick) values ('alberto', 7);


select sleep(1);insert into comentarios (pick, username, texto) values (1, 'javi', 'Yo he visto los tres partidos y para mi Cavs ha dominado en todos ellos. El primero iban ganando casi todo el encuentro excepto al final que Warriors remontaron y forzaron la prorroga, y ahi entre el publico y Curry se llevaron el partido. El segundo encuentro mas de lo mismo, los jugadores de Golden incapaces de parar a Lebron y en el ultimo cuarto tuvieron que remontar para acabar perdiendo en la prorroga.
Y el tercer encuentro, donde otra vez Lebron fue muy superior y no consiguieron pararlo.

Y aun asi, seguimos teniendo cuotas entre 1,8 y 2 a que Cavs gana el anillo... Yo acabo de entrar con stake 1 porque no veo la manera de que los Warriors puedan parar a Lebron.');
select sleep(1);insert into comentarios (pick, username, texto) values (1, 'alicia', 'Estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (1, 'sergio', 'No estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (1, 'felipe', 'No estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (1, 'sergio', 'Estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (1, 'alicia', 'Estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (1, 'javi', 'No estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (2, 'javi', 'Estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (3, 'felipe', 'No estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (2, 'blas', 'No estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (3, 'alicia', 'Estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (1, 'sergio', 'Yo he visto los tres partidos y para mi Cavs ha dominado en todos ellos. El primero iban ganando casi todo el encuentro excepto al final que Warriors remontaron y forzaron la prorroga, y ahi entre el publico y Curry se llevaron el partido. El segundo encuentro mas de lo mismo, los jugadores de Golden incapaces de parar a Lebron y en el ultimo cuarto tuvieron que remontar para acabar perdiendo en la prorroga.
Y el tercer encuentro, donde otra vez Lebron fue muy superior y no consiguieron pararlo.

Y aun asi, seguimos teniendo cuotas entre 1,8 y 2 a que Cavs gana el anillo... Yo acabo de entrar con stake 1 porque no veo la manera de que los Warriors puedan parar a Lebron.');
select sleep(1);insert into comentarios (pick, username, texto) values (2, 'javi', 'Yo he visto los tres partidos y para mi Cavs ha dominado en todos ellos. El primero iban ganando casi todo el encuentro excepto al final que Warriors remontaron y forzaron la prorroga, y ahi entre el publico y Curry se llevaron el partido. El segundo encuentro mas de lo mismo, los jugadores de Golden incapaces de parar a Lebron y en el ultimo cuarto tuvieron que remontar para acabar perdiendo en la prorroga.
Y el tercer encuentro, donde otra vez Lebron fue muy superior y no consiguieron pararlo.

Y aun asi, seguimos teniendo cuotas entre 1,8 y 2 a que Cavs gana el anillo... Yo acabo de entrar con stake 1 porque no veo la manera de que los Warriors puedan parar a Lebron.');
select sleep(1);insert into comentarios (pick, username, texto) values (2, 'alicia', 'Estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (3, 'sergio', 'No estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (2, 'felipe', 'No estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (3, 'sergio', 'Estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (3, 'alicia', 'Estoy deacuerdo');

select sleep(1);insert into comentarios (pick, username, texto) values (1, 'javi', 'Yo he visto los tres partidos y para mi Cavs ha dominado en todos ellos. El primero iban ganando casi todo el encuentro excepto al final que Warriors remontaron y forzaron la prorroga, y ahi entre el publico y Curry se llevaron el partido. El segundo encuentro mas de lo mismo, los jugadores de Golden incapaces de parar a Lebron y en el ultimo cuarto tuvieron que remontar para acabar perdiendo en la prorroga.
Y el tercer encuentro, donde otra vez Lebron fue muy superior y no consiguieron pararlo.

Y aun asi, seguimos teniendo cuotas entre 1,8 y 2 a que Cavs gana el anillo... Yo acabo de entrar con stake 1 porque no veo la manera de que los Warriors puedan parar a Lebron.');
select sleep(1);insert into comentarios (pick, username, texto) values (11, 'alicia', 'Estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (12, 'sergio', 'No estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (13, 'felipe', 'No estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (14, 'sergio', 'Estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (11, 'alicia', 'Estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (12, 'javi', 'No estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (12, 'javi', 'Estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (13, 'felipe', 'No estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (12, 'blas', 'No estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (13, 'alicia', 'Estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (10, 'sergio', 'Yo he visto los tres partidos y para mi Cavs ha dominado en todos ellos. El primero iban ganando casi todo el encuentro excepto al final que Warriors remontaron y forzaron la prorroga, y ahi entre el publico y Curry se llevaron el partido. El segundo encuentro mas de lo mismo, los jugadores de Golden incapaces de parar a Lebron y en el ultimo cuarto tuvieron que remontar para acabar perdiendo en la prorroga.
Y el tercer encuentro, donde otra vez Lebron fue muy superior y no consiguieron pararlo.

Y aun asi, seguimos teniendo cuotas entre 1,8 y 2 a que Cavs gana el anillo... Yo acabo de entrar con stake 1 porque no veo la manera de que los Warriors puedan parar a Lebron.');
select sleep(1);insert into comentarios (pick, username, texto) values (7, 'javi', 'Yo he visto los tres partidos y para mi Cavs ha dominado en todos ellos. El primero iban ganando casi todo el encuentro excepto al final que Warriors remontaron y forzaron la prorroga, y ahi entre el publico y Curry se llevaron el partido. El segundo encuentro mas de lo mismo, los jugadores de Golden incapaces de parar a Lebron y en el ultimo cuarto tuvieron que remontar para acabar perdiendo en la prorroga.
Y el tercer encuentro, donde otra vez Lebron fue muy superior y no consiguieron pararlo.

Y aun asi, seguimos teniendo cuotas entre 1,8 y 2 a que Cavs gana el anillo... Yo acabo de entrar con stake 1 porque no veo la manera de que los Warriors puedan parar a Lebron.');
select sleep(1);insert into comentarios (pick, username, texto) values (8, 'alicia', 'Estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (9, 'sergio', 'No estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (10, 'felipe', 'No estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (13, 'sergio', 'Estoy deacuerdo');
select sleep(1);insert into comentarios (pick, username, texto) values (13, 'alicia', 'Estoy deacuerdo');


insert into pick_comentario (pick, comentario) values (1, 1);
insert into pick_comentario (pick, comentario) values (1, 2);
insert into pick_comentario (pick, comentario) values (1, 3);
insert into pick_comentario (pick, comentario) values (2, 4);
insert into pick_comentario (pick, comentario) values (1, 5);
insert into pick_comentario (pick, comentario) values (3, 6);
insert into pick_comentario (pick, comentario) values (2, 7);
insert into pick_comentario (pick, comentario) values (2, 8);
insert into pick_comentario (pick, comentario) values (4, 9);
insert into pick_comentario (pick, comentario) values (4, 10);
insert into pick_comentario (pick, comentario) values (5, 11);
insert into pick_comentario (pick, comentario) values (6, 12);


	

insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c01', 'Chicago Bulls');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c02', 'Golden State Warriors');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c03', 'Los Ángeles Lakers');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c04', 'Milwaukee Bucks');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c05', 'Miami Heat');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c06', 'Portland Trail Blazers');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c07', 'Memphis Grizzlies');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c08', 'San Antonio Spurs');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c09', 'Dallas Mavericks');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c10', 'Thunder Oklahoma');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c11', 'Houston Rockets');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c12', 'Minesota Timberwolves');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c13', 'Philadelphia 76ers');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c14', 'Atlanta Hawks');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c15', 'Boston Celtics');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c16', 'Brooklyn Nets');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c17', 'Charlotte Hornets');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c18', 'Cleveland Cavaliers');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c19', 'Denver Nuggets');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c20', 'Detroit Pistons');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c21', 'Indiana Pacers');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c22', 'Los Ángeles Clippers');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c23', 'New Orleans Pelicans');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c24', 'New York Knicks');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c25', 'Orlando Magic');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c26', 'Phoenix Suns');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c27', 'Sacramento Kings');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c28', 'Toronto Raptors');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c29', 'Utah Jazz');
insert into equipos (filename, nombre) values ('4dd0d8cc-3d24-4924-91fe-6b7e77263c30', 'Washinton Wizzards');



