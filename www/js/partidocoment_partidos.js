var API_BASE_URL = 'http://localhost:8080/handicap-api/partidos/';
var API_BASE_URL_LOGIN = 'http://localhost:8080/handicap-api';
var API_BASE_URL_PRECIOS = 'http://localhost:8080/handicap-api/partidos/idpartidos/'
var API_BASE_URL_PICKS = 'http://localhost:8080/handicap-api/picks/partidos/'
var API_BASE_URL_PICKS2 = 'http://localhost:8080/handicap-api/picks/'
var API_BASE_URL_COMENTARIOS = 'http://localhost:8080/handicap-api/comentarios/picks/';
var API_BASE_URL_COMENTS = 'http://localhost:8080/handicap-api/comentarios/picks/';
var API_BASE_URL_USERS = 'http://localhost:8080/handicap-api/users/';
var API_BASE_URL_CREATE = 'http://localhost:8080/handicap-api/comentarios/';
var lastFilename;
var username = getCookie('username');
var password = getCookie('password');
var rolename = getCookie('rolename');


// $.ajaxSetup({
//     headers: { 'Authorization': "Basic "+ btoa(username+':'+password) }
// })

$(document).ready(function(){

	$('<p>Bienvenido, '+username +'</p>').appendTo($('#saludo_user'));
	cadVariables = location.search.substring(1,location.search.length);
	arrVariables = cadVariables.split("=");
	var d = arrVariables[0];
	var url = API_BASE_URL_PICKS2 + d;
	var url2 = API_BASE_URL_COMENTS +d;
	var url3 = API_BASE_URL_COMENTS;
	var url4 = API_BASE_URL_USERS;
	// var u = user;
	console.log(url);
	// getPartido(d);
	getPicks(d);
	getComentarios(url2);
	// getUsers(url4);

	
});

//////users

function getUser(url) {
	var url= API_BASE_URL_USERS + url;
	$("#result_anuncios").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				// var user = data;

				// $("#result_anuncios").text('');
				// $('<div class="item active" id="im1"><img  src="' + user.imageURL + '"></div>').appendTo($('#imagenperfil'));
				// $('<div class="perfilusers"><strong> Nombre:  &nbsp; &nbsp;</strong><text class="kkk">' + user.name + '</text></div><hr class="se"><hr class="se">').appendTo($('#result_anuncios'));
				// $('<div class="perfilusers"><strong> Username: </strong><text class="kkk">' + user.username + '</text></div><hr class="se"><hr class="se">').appendTo($('#result_anuncios'));
				// $('<div class="perfilusers"><strong> Email: </strong><text class="kkk">' + user.email + '</text></div><hr class="se"><hr class="se">').appendTo($('#result_anuncios'));
				
			}).fail(function() {
				// $('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#result_anuncios"));
	
	});
	
}



//////////////comentarios


function ComentarioCollection(comentarioCollection, respuesta, comentarios){
	this.comentarios = comentarioCollection;	
	var instance = this;
	this.buildLinks = function(header){
		if (header != null ) {
			this.links = weblinking.parseHeader(header);
		} else {
			this.links = weblinking.parseHeader('');
		}
	}

	/*this.getLink = function(rel){
                return this.links.getLinkValuesByRel(rel);
	}
	
	/*this.links = buildLinks(partidos.links);
	var instance = this;
	this.getLink = function(rel){
		return this.links[rel];
	}*/
	
	console.log ("hola");
	this.toHTML = function(){
		var html = '';
		$.each(this.comentarios, function(i, v) {
			
			var comentario = v;
			var idcomentario = comentario.idcomentario;
			var fecha = new Date(comentario.creation_timestamp).toGMTString();
			// html = html.concat(
			// 	'<div class="item active" id="im1"><img class="imgcenterr" width="130" height="130" align=left src="'+respuesta.partidos[i].imageURL2+'"' +  
			// 	'<div class="item active"><img class="imgcenter"  width="130" height="130" align=left src="'+respuesta.partidos[i].imageURL3+'"' + 
			// 	'<div class="item active"><img class="imgcenterr"  width="130" height="130" align=left src="'+respuesta.partidos[i].imageURL1+'"' );
		
			
			html = html.concat('<li class="event"><input type="radio" name="tl-group" checked/><img id="ball" src="images/favicon.png"><div class="thumb user-4"><span>'+comentario.username+'</span></div>');
			html = html.concat('<div class="content-perspective"><div class="content"><div class="content-inner">');
			html = html.concat('<h3>'+ comentario.username +'</h3><br>');
		
			html = html.concat('<p>'+ comentario.texto +'</p>');
			html = html.concat('</div></div></div></li>');
			
			html = html.concat('<FONT class="textss" id="textcom" color="#F78A0E"> Publicado: </FONT>' + fecha + '<br>');
			html = html.concat('<br>');
			//html = html.concat('<a class="boton verde" onclick="getAnuncio('+idpartido+')" id="anuncio" align=right>Ver anuncio</a><br>');
		});
		

	

      /*  var prev = this.getLink('after');
		
		
		if (prev != null) {
			console.log (prev.href);
			html = html.concat('<a class="boton azul" onClick="getAnuncios(\'' + prev.href + '\')" id="prev" align=right>Anterior</a>');
			
		}*/
		
      /*var next = this.getLink('before');
			
		if (next != null) {
			url = next.href.split("?");
			final= url[1].split("=");
			if (final[1]=='0'){
				html = html.concat('<a class="boton azul" onClick="getPrincipio()" id="next" align=right>Volver al principio</a>');
			}
			else{
			//html = html.concat ('<pre style=display:inline>&#09</pre>');
			html = html.concat('<a class="boton azul" onClick="getAnuncios(\'' + next.href + '\')" id="next" align=right>Cargar Siguientes</a>');
			}
		}*/
		

 		return html;	
	}
}

function getComentarios(url){

	$("#comentarios_result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr){
				var response = data.comentarios;
				var comentarios= data;
				var respuesta = $.parseJSON(jqxhr.responseText);
				var comentarioCollection = new ComentarioCollection(response, respuesta, comentarios);
				//var linkHeader = jqxhr.getResponseHeader('links');
				//console.log(linkHeader);
				//anuncioCollection.buildLinks(linkHeader);
				var html =comentarioCollection.toHTML();
				$("#comentarios_result").html(html);
				
	}).fail(function(jqXHR, textStatus) {
		console.log(hola);
	});
}



////////////////

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
// 				$('<div class="alert alert-danger"> <strong>Partido sin picks!!!</strong></div>').appendTo($("#result_anuncios3"));
			
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
				
				$('<div class="perfilusers2">Texto del Pick:<br><br><text class="kkk2">'+ data.texto + '</text><br><br></div>').appendTo($('#result_anuncios4'));
				$('<a class="boton4 verde" href="javascript:history.back()" id="pick" align=center>Volver</a>').appendTo($('#result_anuncios4'));
				$('<br>').appendTo($('#result_anuncios4'));
				$('<hr>').appendTo($('#result_anuncios4'));

				


		}).fail(function() {
				$('<div class="alert alert-danger"> <strong> Partido sin Picks!! </strong></div>').appendTo($("#result_anuncios5"));
			
		});
}




/////////

////////crear com

$("#enviarcom").click(function(e){
	
	// if($('#textopick').val() == ""){
	// 	$('<div class="alert alert-info">Mensaje en blanco, debes escribir un mensaje </div>').appendTo($("#result_anuncios3"));
	// }
	// else{
	// d= datos.split(",");
	// idanuncio= d[0];
	// usuariorecibe=d[1];
	e.preventDefault();

	cadVariables = location.search.substring(1,location.search.length);
	arrVariables = cadVariables.split("=");
	var id = arrVariables[0];

	
	

	var txt = $('#textocom').val();

		Comentario = {
			"pick" : id,
			"username" : username,
			"texto" : txt,
		}
		createComentario(Comentario);
		console.log(Comentario);
		
		
});



function createComentario(Comentario) {
	var url = API_BASE_URL_CREATE;
	var data = JSON.stringify(Comentario);
	console.log(url);
	console.log(Comentario);
	


	$.ajax({
	
		// headers : {
		// 	'Authorization' : "Basic " + btoa(username + ':' + password)
		// },
		url : url,
		contentType: 'application/vnd.partidos.api.partido+json',
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		data : data,
		statusCode: {
    		400: function() {$('<div class="alert alert-danger"> <strong>Error!</strong> Bad Request </div>').appendTo($("#result"));},
			409: function() {$('<div class="alert alert-danger"> <strong>Error!</strong> Conflict </div>').appendTo($("#result"));}
    	}

	}).done(function(data, status, jqxhr) {
		alert("Comentario Enviado!!!");
  	}).fail(function() {
  		
	});
  	// location.reload();
}


/////////////
// function getRefresh(){
// 	window.location= "partidocoment_partidos.html";
// 	pasarVariables ('partidocoment_partidos.html');
// 	$('partidocoment_partidos.html').ready(function(){
// 	});
// }


function getPrincipio(){
	window.location= "partidoreg.html";
	pasarVariables ('partidoreg.html');
	$('partidoreg.html').ready(function(){
	});
}
// function getPartits(){
// 	window.location= "partidoreg.html";
// 	pasarVariables ('partidoreg.html');
// 	$('partidoreg.html').ready(function(){
// 	});
// }


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

function getPartidos(url){

	$("#result_anuncios").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr){
				var response = data.partidos;
				var partidos= data;
				var respuesta = $.parseJSON(jqxhr.responseText);
				var partidoCollection = new PartidoCollection(response, respuesta, partidos);
				//var linkHeader = jqxhr.getResponseHeader('links');
				//console.log(linkHeader);
				//anuncioCollection.buildLinks(linkHeader);
				var html =partidoCollection.toHTML();
				$("#result_anuncios").html(html);
				
	}).fail(function(jqXHR, textStatus) {
		console.log(textStatus);
	});
}

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
		$('#saludo_user').html('<p>Cerrando Sesión!!</strong></FONT>');
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

