var API_BASE_URL = 'http://localhost:8080/handicap-api/partidos/';
var API_BASE_URL_LOGIN = 'http://localhost:8080/handicap-api';
var API_BASE_URL_PRECIOS = 'http://localhost:8080/handicap-api/partidos/idpartidos/'
var API_BASE_URL_PICKS = 'http://localhost:8080/handicap-api/picks/partidos/'
var API_BASE_URL_PICKS2 = 'http://localhost:8080/handicap-api/picks/'
var API_BASE_URL_COMENTARIOS = 'http://localhost:8080/handicap-api/comentarios/picks/';
var lastFilename;
var username = getCookie('username');
var password = getCookie('password');
var rolename = getCookie('rolename');


$(document).ready(function(){

	$('<p>Bienvenido, '+username +'</p>').appendTo($('#saludo_user'));
	cadVariables = location.search.substring(1,location.search.length);
	arrVariables = cadVariables.split("=");
	var d = arrVariables[0];
	var url = API_BASE_URL_PICKS2 + d;
	console.log(url);
	// getPartido(d);
	getPicks(d);

	
});

// function getPartido(d){

// 	var url = API_BASE_URL +  d;
// 		$("#result_anuncio").text('');
// 		$.ajax({
// 		url : url,
// 		type : 'GET',
// 		crossDomain : true,
// 		dataType : 'json',
// 		}).done(function(data, status, jqxhr) {
				
// 				var partido = data;
				
// 				var respuesta = $.parseJSON(jqxhr.responseText);
// 				var fecha = new Date(partido.creation_timestamp).toGMTString();
				
			
// 				// $('<strong>Partido creado el día:</strong> ' + fecha + '<br>').appendTo($('#result_anuncio3'));	
// 				// $('<br>').appendTo($('#result_anuncio3'));
// 				// $('<br>').appendTo($('#result_anuncio3'));	
// 				// console.log(partido.imageURL3);
// 				// $('<div class="item active" id="im1"><img class="imgcenterr" width="130" height="130" align=left src="'+partido.imageURL2+'"').appendTo($('#result_anuncios3'));
// 				// $('<div class="item active"><img class="imgcenter"  width="130" height="180" align=left src="'+partido.imageURL3+'"').appendTo($('#result_anuncios3'));
// 				// $('<div class="item active"><img class="imgcenterr"  width="130" height="130" align=left src="'+partido.imageURL1+'"').appendTo($('#result_anuncios3'));
// 				// $('<br>').appendTo($('#result_anuncios3'));
// 				// $('<br>').appendTo($('#result_anuncios3'));
// 				// $('<br>').appendTo($('#result_anuncios3'));
// 				// $('<br>').appendTo($('#result_anuncios3'));
// 				// $('<br>').appendTo($('#result_anuncios3'));
// 				// $('<br>').appendTo($('#result_anuncios3'));
// 				// $('<br>').appendTo($('#result_anuncios3'));
// 				// $('<br>').appendTo($('#result_anuncios3'));
// 				// $('<br>').appendTo($('#result_anuncios3'));
// 				// $('<br>').appendTo($('#result_anuncios3'));
// 				$('<br>').appendTo($('#result_anuncios3'));
// 				$('<br>').appendTo($('#result_anuncios3'));
// 				$('<FONT class="texts" color="#F78A0E"><strong> Equipo Visitante: </strong></FONT><FONT color="#FFFFFF">' + partido.e_visitante + '</FONT><br>').appendTo($('#result_anuncios3'));
// 				$('<FONT class="texts" color="#F78A0E"><strong> Equipo Local: </strong> </FONT><FONT color="#FFFFFF">' + partido.e_local + '</FONT><br>').appendTo($('#result_anuncios3'));
// 				$('<FONT class="texts" color="#F78A0E"><strong> Lugar del Partido: </strong> </FONT><FONT color="#FFFFFF">' + partido.lugar + '</FONT><br>').appendTo($('#result_anuncios3'));
// 				$('<FONT class="texts" color="#F78A0E"><strong> Jornada Número: </strong> </FONT><FONT color="#FFFFFF">' + partido.jornada + '</FONT><br>').appendTo($('#result_anuncios3'));
// 				$('<FONT class="texts" color="#F78A0E"><strong> Resultado del partido: </strong></FONT><FONT color="#FFFFFF">' + partido.e_visitante + '</FONT><FONT color="#F78A0E"><strong> VS </strong></FONT><FONT color="#FFFFFF">' 
// 			+ partido.e_local + '</FONT><FONT color="#F78A0E"><strong> : </strong></FONT><FONT color="#FFFFFF">' + partido.puntuacionv + 
// 			'</FONT><FONT color="#F78A0E"><strong> - </strong></FONT><FONT color="#FFFFFF">' + partido.puntuacionl + '</FONT><br>').appendTo($('#result_anuncios3'));
// 				$('<br>').appendTo($('#result_anuncios3'));
// 				$('<br>').appendTo($('#result_anuncios3'));
// 				$('<br>').appendTo($('#result_anuncios3'));
// 				var fecha = new Date(partido.creation_timestamp).toGMTString();
// 				$('<FONT class="textss" color="#F78A0E"> Publicado: </FONT>' + fecha + '<br>').appendTo($('#result_anuncios3'));
// 				$('<br>').appendTo($('#result_anuncios3'));
// 				// $('<a class="boton verde" href="coments.html" onclick="getPartido('+idpartido+')" id="anuncio" align=left>Entrar idp:'+idpartido+'</a><br>').appendTo($('#result_anuncio'));
// 				// $('<a class="boton verde" href="pick.html" onclick="getPartido('+idpartido+')" id="cerrar2" align=left>Crear Pick idp:'+idpartido+'</a><br>').appendTo($('#result_anuncio'));
// 				$('<br>').appendTo($('#result_anuncios3'));
// 				$('<hr size="4"  />').appendTo($('#result_anuncios3'));

				
// 		}).fail(function() {
// 				$('<div class="alert alert-danger"> <strong>Oh!</strong> Partido no encontrado </div>').appendTo($("#result_anuncios3"));
			
// 		});
// }
//////////
function getPicks(d){

	var url = API_BASE_URL_PICKS2 +  d;
		$("#result_anuncio4").text('');
		$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
		}).done(function(data, status, jqxhr) {
				
				var pick = data;
				
				var respuesta = $.parseJSON(jqxhr.responseText);
				var fecha = new Date(pick.creation_timestamp).toGMTString();
				
			
				// $('<strong>Partido creado el día:</strong> ' + fecha + '<br>').appendTo($('#result_anuncio3'));	
				// $('<br>').appendTo($('#result_anuncio3'));
				// $('<br>').appendTo($('#result_anuncio3'));	
				// console.log(partido.imageURL3);
				// $('<div class="item active" id="im1"><img class="imgcenterr" width="130" height="130" align=left src="'+partido.imageURL2+'"').appendTo($('#result_anuncios3'));
				// $('<div class="item active"><img class="imgcenter"  width="130" height="180" align=left src="'+partido.imageURL3+'"').appendTo($('#result_anuncios3'));
				// $('<div class="item active"><img class="imgcenterr"  width="130" height="130" align=left src="'+partido.imageURL1+'"').appendTo($('#result_anuncios3'));
				// $('<br>').appendTo($('#result_anuncios3'));
				// $('<br>').appendTo($('#result_anuncios3'));
				// $('<br>').appendTo($('#result_anuncios3'));
				// $('<br>').appendTo($('#result_anuncios3'));
				// $('<br>').appendTo($('#result_anuncios3'));
				// $('<br>').appendTo($('#result_anuncios3'));
				// $('<br>').appendTo($('#result_anuncios3'));
				// $('<br>').appendTo($('#result_anuncios3'));
				// $('<br>').appendTo($('#result_anuncios3'));
				// $('<br>').appendTo($('#result_anuncios3'));
				// $('<br>').appendTo($('#result_anuncios3'));
				// $('<br>').appendTo($('#result_anuncios3'));

				$('<div class="perfilusers2">Título del Pick:<br><br><text class="kkk2">'+ data.titulo + '</text><br><br></div>').appendTo($('#result_anuncios4'));
				$('<div class="perfilusers2">Texto del Pick:<br><br><text class="kkk2">'+ data.texto + '</text><br><br><a class="boton4 verde" onclick="getPrincipio()" id="pick" align=center>Volver</a></div>').appendTo($('#result_anuncios4'));

				
		}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> Partido no encontrado </div>').appendTo($("#result_anuncios4"));
			
		});
}




/////////



function getPrincipio(){
	window.location= "perfilfavoritosadmin.html";
	pasarVariables ('perfilfavoritosadmin.html');
	$('perfilfavoritosadmin.html').ready(function(){
	});
}



function Link(rel, linkheader){
	this.rel = rel;
	this.href = decodeURIComponent(linkheader.find(rel).template().template);
	
	this.type = linkheader.find(rel).attr('type');

	this.title = linkheader.find(rel).attr('title');
	
}

function buildLinks(linkheaders){
	var links = {};
	$.each(linkheaders, function(i,linkheader){
		var linkhdr = $.linkheaders(linkheader);
		var rels = linkhdr.find().attr('rel').split(' ');
		$.each(rels, function(key,rel){
			var link = new Link(rel, linkhdr);
			links[rel] = link;
		});
	});

	return links;
}

// function getPartidos(url){

// 	$("#result_anuncios").text('');
	
// 	$.ajax({
// 		url : url,
// 		type : 'GET',
// 		crossDomain : true,
// 		dataType : 'json',
// 	}).done(function(data, status, jqxhr){
// 				var response = data.partidos;
// 				var partidos= data;
// 				var respuesta = $.parseJSON(jqxhr.responseText);
// 				var partidoCollection = new PartidoCollection(response, respuesta, partidos);
// 				//var linkHeader = jqxhr.getResponseHeader('links');
// 				//console.log(linkHeader);
// 				//anuncioCollection.buildLinks(linkHeader);
// 				var html =partidoCollection.toHTML();
// 				$("#result_anuncios").html(html);
				
// 	}).fail(function(jqXHR, textStatus) {
// 		console.log(textStatus);
// 	});
// }

// function getPartido(i) {
	
// 	window.location= "partidoreg.html";
// 	pasarVariables ('partidoreg.html',i);
// 	$('partidoreg.html').ready(function(){
// 	});
// }
// function getPick(i) {
	
// 	window.location= "partidoreg.html";
// 	pasarVariables ('partidoreg.html',i);
// 	$('partidoreg.html').ready(function(){
// 	});
// }

function pasarVariables(pagina, i) {
	pagina +="?";
	pagina += i + "=" + escape(eval(i))+"&";
	pagina = pagina.substring(0,pagina.length-1);
	location.href=pagina;
}



$("#button_exit").click(function(e) {
    e.preventDefault();
	  if(($.removeCookie('password'))&&($.removeCookie('rolename'))&&($.removeCookie('username'))) {
		$('#saludo_user').html('<p>Sesion cerrada!!</strong></FONT>');
		window.setTimeout('window.location.replace("index.html")', 2000); // refresh after 2 sec
	  }
 });




function GetRoles() {
	var username = getCookie('username');
	var url= API_BASE_URL_LOGIN + '/users/roles/' +username;

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
					var rolename= data.rolename;
					setCookie('rolename', rolename,1)
						

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> File not found </div>').appendTo($("#result"));
	});

}




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

