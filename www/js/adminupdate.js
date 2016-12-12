var API_BASE_URL = 'http://localhost:8080/handicap-api/partidos/team/';
var API_BASE_URL2 = 'http://localhost:8080/handicap-api/partidos/';
var API_BASE_URL_LOGIN = 'http://localhost:8080/handicap-api';
var API_BASE_URL_PRECIOS = 'http://localhost:8080/handicap-api/partidos/idpartidos/'
var API_BASE_URL_PROVINCIAS = 'http://localhost:8080/handicap-api/picks/'
var lastFilename;


var username = getCookie('username');
var password = getCookie('password');
var rolename = getCookie('rolename');


var selequipo1;
var selequipo2;
var jornada;
var filenamel;
var filenamev;

$(document).ready(function(){
	$('<p>Bienvenido, '+username +'</p>').appendTo($('#saludo_user'));
	cadVariables = location.search.substring(1,location.search.length);
	arrVariables = cadVariables.split("=");
	var id = arrVariables[0];
	var url = API_BASE_URL + id;

});

$("#localteam").click(function(e){
	
	$("#uno").text('');
	var equipo = document.getElementById("localteam");
	selequipo1 = equipo.options[equipo.selectedIndex].text;
	if(selequipo1!="Equipo Local"){
		getEquipoL(selequipo1);
	}	
	
});

$("#visitanteteam").click(function(e){
	$("#dos").text('');
	var equipo = document.getElementById("visitanteteam");
	selequipo2 = equipo.options[equipo.selectedIndex].text;
	if(selequipo2!="Equipo Visitante"){
		getEquipoV(selequipo2);
	}	
	
});

$("#jornadas").click(function(e){
	var equipo = document.getElementById("jornadas");
	jornada = equipo.options[equipo.selectedIndex].text;	
});

// $("#uploadButton2").click(function(e){
// 	console.log(selequipo1);
// 	console.log(selequipo2);
// 	console.log(jornada);

// 	partido = {
// 		"filename1":filenamel,
// 		"filename2":filenamev,
// 		"filename3":"4dd0d8cc-3d24-4924-91fe-6b7e77263c99",
// 		"e_local": selequipo1,
// 		"e_visitante": selequipo2,
// 		"jornada": jornada,
// }

// 	// if(jornada!="Jornada"){
// 	crearPartido(partido);
// 	// }
	

// });
///////////////

$("#uploadButton2").click(function(e) {
	// $('#result').empty();
	e.preventDefault();

    // var partido;

	
	
	 partido = {
			
			// "filename3":"4dd0d8cc-3d24-4924-91fe-6b7e77263c99",
			"e_local": selequipo1,
			"e_visitante": selequipo2,
			"jornada": jornada,
			"filename1":filenamel,
			"filename2":filenamev,
			
	}

	updatePartido(partido);
	
});

function updatePartido(partido) {
	cadVariables = location.search.substring(1,location.search.length);
	arrVariables = cadVariables.split("=");
	var id = arrVariables[0];
	var url = API_BASE_URL2 + id;
	
	var data = JSON.stringify(partido);

	// $("#result").text('');
	
	$.ajax({
		url : url,
		contentType: 'application/vnd.partidos.api.partido+json',
		type : 'PUT',
		crossDomain : true,
		dataType : 'json',
		data : data,
		// statusCode: {
  //   		404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div>').appendTo($("#result"));},
		// 	400: function() {$('<div class="alert alert-danger"> <strong>Error!</strong> Bad request </div>').appendTo($("#result"));}
  //   	}
	}).done(function(data, status, jqxhr) {
				var file = data;
					
					
				console.log(data);
				alert("Partido actualizado!");	
		
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Error!</strong> El juego no ha podido crearse</div>').appendTo($("#result"));
	});

}

////////////

function getEquipoL(selequipo){
	console.log("hola Raul");

	var url = API_BASE_URL + selequipo;
		
		$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
		}).done(function(data, status, jqxhr) {
				filenamel=data.filename1;
				var equipo = data;
				var respuesta = $.parseJSON(jqxhr.responseText);
				console.log(data);	
				$('<img id="vv" width="130" height="180" align="left" src="'+data.imageURL1+'">').appendTo($('#uno'));
		}).fail(function() {
				// $('<div class="alert alert-danger"> <strong>Oh!</strong> Anuncio no encontrado </div>').appendTo($("#result_anuncio"));
				
	});

}

function getEquipoV(selequipo){
	console.log("hola Raul2");

	var url = API_BASE_URL + selequipo;
		
		$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
		}).done(function(data, status, jqxhr) {
				filenamev=data.filename1;
				var equipo = data;
				var respuesta = $.parseJSON(jqxhr.responseText);
				console.log(data);	
				$('<img id="vs" width="130" height="180" align="left" src="'+data.imageURL1+'">').appendTo($('#dos'));
		}).fail(function() {
				// $('<div class="alert alert-danger"> <strong>Oh!</strong> Equipo no encontrado </div>').appendTo($("#result_anuncio"));
				 
			
	});
}

// $("#button_exit").click(function(e) {
//     e.preventDefault();
	  
// 			if( $.removeCookie('username') ) {
// 				$('#saludo_user').html('<p>Sesion cerrada!!</strong></FONT>');
// 				window.setTimeout('window.location.replace("index.html")', 2000); // refresh after 2 sec
// 			}
	  
//  });

$("#button_exit").click(function(e) {
    e.preventDefault();
	  if(($.removeCookie('password'))&&($.removeCookie('rolename'))&&($.removeCookie('username'))) {
		$('#saludo_user').html('<p>Cerrando Sesión!!</strong></FONT>');
		window.setTimeout('window.location.replace("index.html")', 2000); // refresh after 2 sec
	  }
 });


function getCookie(cname) {

    var name = cname + "=";

    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);{
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);{}}
    }
    return "";
} 




