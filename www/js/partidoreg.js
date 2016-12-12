var API_BASE_URL = 'http://localhost:8080/handicap-api/partidos/';
var API_BASE_URL_LOGIN = 'http://localhost:8080/handicap-api';
var API_BASE_URL_PRECIOS = 'http://localhost:8080/handicap-api/partidos/idpartidos/'
var API_BASE_URL_PICKS = 'http://localhost:8080/handicap-api/picks/partidos/'
var API_BASE_URL_FAV = 'http://localhost:8080/handicap-api/favoritos/'
var lastFilename;

var username = getCookie('username');
var password = getCookie('password');
var rolename = getCookie('rolename');




$(document).ready(function(){
	
	$('<p>Bienvenido, '+username +'</p>').appendTo($('#saludo_user'));
	cadVariables = location.search.substring(1,location.search.length);
	arrVariables = cadVariables.split("=");
	var id = arrVariables[0];
	var url = API_BASE_URL;
	var url2 = API_BASE_URL_PICKS + id;
	var url3 = API_BASE_URL_FAV;
	console.log(url);
	console.log(url2);
	getPartido(id);
	getPicks(url2);
	
});

function getPartido(id){

	var url = API_BASE_URL +  id;
		$("#result_anuncio").text('');
		$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
		}).done(function(data, status, jqxhr) {
				
				var partido = data;
				
				var respuesta = $.parseJSON(jqxhr.responseText);
				var fecha = new Date(partido.creation_timestamp).toGMTString();
				
			
				// $('<strong>Partido creado el día:</strong> ' + fecha + '<br>').appendTo($('#result_anuncio'));	
				// $('<br>').appendTo($('#result_anuncio'));
				// $('<br>').appendTo($('#result_anuncio'));	

				// $('<div class="item active" id="im1"><img class="imgcenterr" width="130" height="130" align=left src="'+partido.imageURL2+'"').appendTo($('#result_anuncios'));
				// $('<div class="item active"><img class="imgcenter"  width="130" height="180" align=left src="'+partido.imageURL3+'"').appendTo($('#result_anuncios'));
				// $('<div class="item active"><img class="imgcenterr"  width="130" height="130" align=left src="'+partido.imageURL1+'"').appendTo($('#result_anuncios'));
				// $('<br>').appendTo($('#result_anuncios'));
				// $('<br>').appendTo($('#result_anuncios'));
				// $('<br>').appendTo($('#result_anuncios'));
				// $('<br>').appendTo($('#result_anuncios'));
				// $('<br>').appendTo($('#result_anuncios'));
				// $('<br>').appendTo($('#result_anuncios'));
				// $('<br>').appendTo($('#result_anuncios'));
				// $('<br>').appendTo($('#result_anuncios'));
				// $('<br>').appendTo($('#result_anuncios'));
				$('<br>').appendTo($('#result_anuncios'));
				$('<br>').appendTo($('#result_anuncios'));
				$('<br>').appendTo($('#result_anuncios'));
				$('<FONT class="texts" color="#F78A0E"><strong> Equipo Visitante: </strong></FONT><FONT color="#FFFFFF">' + partido.e_visitante + '</FONT><br>').appendTo($('#result_anuncios'));
				$('<FONT class="texts" color="#F78A0E"><strong> Equipo Local: </strong> </FONT><FONT color="#FFFFFF">' + partido.e_local + '</FONT><br>').appendTo($('#result_anuncios'));
				$('<FONT class="texts" color="#F78A0E"><strong> Lugar del Partido: </strong> </FONT><FONT color="#FFFFFF">' + partido.lugar + '</FONT><br>').appendTo($('#result_anuncios'));
				$('<FONT class="texts" color="#F78A0E"><strong> Jornada Número: </strong> </FONT><FONT color="#FFFFFF">' + partido.jornada + '</FONT><br>').appendTo($('#result_anuncios'));
				$('<FONT class="texts" color="#F78A0E"><strong> Resultado del partido: </strong></FONT><FONT color="#FFFFFF">' + partido.e_visitante + '</FONT><FONT color="#F78A0E"><strong> VS </strong></FONT><FONT color="#FFFFFF">' 
			+ partido.e_local + '</FONT><FONT color="#F78A0E"><strong> : </strong></FONT><FONT color="#FFFFFF">' + partido.puntuacionv + 
			'</FONT><FONT color="#F78A0E"><strong> - </strong></FONT><FONT color="#FFFFFF">' + partido.puntuacionl + '</FONT><br>').appendTo($('#result_anuncios'));
				$('<br>').appendTo($('#result_anuncios'));
				$('<br>').appendTo($('#result_anuncios'));
				$('<br>').appendTo($('#result_anuncios'));
				var fecha = new Date(partido.creation_timestamp).toGMTString();
				$('<FONT class="textss" color="#F78A0E"> Publicado: </FONT>' + fecha + '<br>').appendTo($('#result_anuncios'));
				$('<br>').appendTo($('#result_anuncios'));
				// $('<a class="boton verde" href="coments.html" onclick="getPartido('+idpartido+')" id="anuncio" align=left>Entrar idp:'+idpartido+'</a><br>').appendTo($('#result_anuncio'));
				// $('<a class="boton verde" href="pick.html" onclick="getPartido('+idpartido+')" id="cerrar2" align=left>Crear Pick idp:'+idpartido+'</a><br>').appendTo($('#result_anuncio'));
				$('<br>').appendTo($('#result_anuncios'));
				$('<hr size="4"  />').appendTo($('#result_anuncios'));


		
				
		}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> Partido no encontrado </div>').appendTo($("#result_anuncios"));
			
		});
}

//////////////////////////



function PickCollection(pickCollection, respuesta, picks){
	this.picks = pickCollection;	
	var instance = this;


	
	
	
	console.log ("hola");
	this.toHTML = function(){
		var html = '';
		$.each(this.picks, function(i, v) {
			var pick = v;
			var idpick = pick.idpick;
			var fecha = new Date(pick.creation_timestamp).toGMTString();
			html = html.concat('<br>');
			html = html.concat('<br>');
			html = html.concat('<div class="perfilusers2">Pick:<br><br><text class="kkk2">'+ pick.titulo + 
							   '</text><br><br><a class="boton4 verde" onclick="getCom('+pick.idpick+')" id="pick" align=center>Entrar idpick:'+pick.idpick+'</a><a class="boton4 verde" id="fav" onclick="getfav('+pick.idpick+')" align=center>Favorito idpick:'+pick.idpick+'</a></div>');
			html = html.concat('<br>');
			html = html.concat('<br>');
			html = html.concat('<FONT class="textss" color="#F78A0E"> Publicado: </FONT>' + fecha + '<br>');
			
			html = html.concat('<hr>');
	
		});
		
	

		

 		return html;	
	}
}
function getCom(i) {
	
	window.location= "partidocoment_partidos.html";
	pasarVariables ('partidocoment_partidos.html',i);
	$('partidocoment_partidos.html').ready(function(){
	});
}


function pasarVariables(pagina, i) {
	pagina +="?";
	pagina += i + "=" + escape(eval(i))+"&";
	pagina = pagina.substring(0,pagina.length-1);
	location.href=pagina;
}

function getfav(id) {
	
	
	var Favorito;

		user = getCookie('username');

		Favorito = {
			"username" : user,
			"idpick" : id,
		}

		console.log(Favorito);
		createFav(Favorito);
}
////////////





function createFav(Favorito) {
	var url = API_BASE_URL_FAV;
	var data = JSON.stringify(Favorito);
	console.log(url);
	console.log(Favorito);
	

	$.ajax({
		
        url : url,
		contentType: 'application/vnd.favoritos.api.favorito+json',
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		data : data,
		statusCode: {
    		400: function() {$('<div class="alert alert-danger"> <strong>Error!</strong> Bad Request </div>').appendTo($("#result"));},
			409: function() {$('<div class="alert alert-danger"> <strong>Error!</strong> Conflict </div>').appendTo($("#result"));}
    	}
		
	}).done(function(data, status, jqxhr) {
	console.log(data);
		
		alert("Pick añadido a favoritos!!");

  	}).fail(function() {
  		alert("Ya está en tu lista de favoritos");
	});

}






//////////////
// function getFav(i) {
// 	cadVariables = location.search.substring(1,location.search.length);
// 	arrVariables = cadVariables.split("=");
// 	var id = arrVariables[0];
	
// }


function getPicks(url2){

	$("#result_anuncios2").text('');
	
	$.ajax({
		url : url2,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr){
				var response = data.picks;
				var picks= data;
				var respuesta = $.parseJSON(jqxhr.responseText);
				var pickCollection = new PickCollection(response, respuesta, picks);
				//var linkHeader = jqxhr.getResponseHeader('links');
				//console.log(linkHeader);
				//anuncioCollection.buildLinks(linkHeader);
				var html =pickCollection.toHTML();
				$("#result_anuncios2").html(html);
				
	}).fail(function(jqXHR, textStatus) {
		console.log(textStatus);

			$('<div class="perfilusers2"><strong><br><br>&nbsp;NO HAY PICKS PARA EL PARTIDO!!!<br><br><text class="kkk2"></strong></div>').appendTo($("#result_anuncios2"));

	});

}






$("#button_exit").click(function(e) {
    e.preventDefault();
	  if(($.removeCookie('password'))&&($.removeCookie('rolename'))&&($.removeCookie('username'))) {
		$('#saludo_user').html('<p>Sesion cerrada!!</strong></FONT>');
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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
	
}


