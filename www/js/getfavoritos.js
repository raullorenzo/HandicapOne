var API_BASE_URL_FAVORITOS = 'http://localhost:8080/handicap-api/favoritos';
var API_BASE_URL = 'http://localhost:8080/handicap-api/picks';
var lastFilename;
var username = getCookie('username');
var password = getCookie('password');
var id;
$(document).ready(function(){
	$('<p>Bienvenido, '+username +'</p>').appendTo($('#saludo_user'));
	var url = API_BASE_URL_FAVORITOS;
	getFavoritos(url);
	
});

function FavoritoCollection(favoritoCollection, respuesta, favoritos){
	this.favoritos = favoritoCollection;	
	var instance = this;

	/*	this.buildLinks = function(header){
		if (header != null ) {
			this.links = weblinking.parseHeader(header);
		} else {
			this.links = weblinking.parseHeader('');
		}
	}

	this.getLink = function(rel){
                return this.links.getLinkValuesByRel(rel);
	}*/
	
	this.links = buildLinks(favoritos.links);
	var instance = this;
	this.getLink = function(rel){
		return this.links[rel];
	}
	
	this.toHTML = function(){
		var html = '';
		$.each(this.favoritos, function(i, v) {
			var favorito = v;
			var idpick = favorito.idpick;
			getPick(idpick);				
		});
		
		
        var prev = this.getLink('after');
		
		
		if (prev != null) {
			url = prev.href.split("?");
			final= url[1].split("=");
			if (final[1]=='0'){
					
			}
			else{
			$('<a class="boton2 azul" onClick="getFavoritos(\'' + prev.href + '\')" id="prev" align=right>Anterior</a>').appendTo($('##result_anuncios2'));
			//html = html.concat('<a class="boton azul" onClick="getAnuncios(\'' + prev.href + '\')" id="prev" align=right>Anterior</a>');
			}
		}
        var next = this.getLink('before');
			
		if (next != null) {
			url = next.href.split("?");
			final= url[1].split("=");
			if (final[1]=='0'){
					//$('<pre style=display:inline>&#09</pre>').appendTo($('#result_favoritos'));
					$('<a class="boton3 azul" onClick="getPrincipio()" id="next" align=right>Volver al principio</a>').appendTo($('##result_anuncios2'));
			}
			else{
			$('<pre style=display:inline>&#09</pre>').appendTo($('#result_anuncios2'));
			$('<a class="boton verde" onClick="getFavoritos(\'' + next.href + '\')" id="next" align=right>Siguiente</a>').appendTo($('##result_anuncios2'));
			$('<br>').appendTo($('#result_anuncios'));
			//html = html.concat ();
			//html = html.concat();
			}
		}
		

 		return html;	
	}
}
function getPrincipio(){
window.location= "perfilfavoritos.html";
	pasarVariables ('perfilfavoritos.html');
	$('perfilfavoritos.html').ready(function(){
	});
}
function getFavoritos(url){

	$("#result_anuncios").text('');
	$("#result_anuncios2").text('');
	
	$.ajax({
		headers : {
			'Authorization' : "Basic " + btoa(username + ':' + password)
		},
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr){
				var response = data.favoritos;
				var favoritos= data;
				var respuesta = $.parseJSON(jqxhr.responseText);				
				var favoritoCollection = new FavoritoCollection(response, respuesta, favoritos);
				//var linkHeader = jqxhr.getResponseHeader('Link');
                //favoritoCollection.buildLinks(linkHeader);
				var html = favoritoCollection.toHTML();
				//$("#result_mensajes").html(html);
				
	}).fail(function(jqXHR, textStatus) {
		console.log(textStatus);
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
function getPick(i) {
	
	window.location= "registrado.html";
	pasarVariables ('registrado.html',i);
	$('registrado.html').ready(function(){
	});
}

function pasarVariables(pagina, i) {
	pagina +="?";
	pagina += i + "=" + escape(eval(i))+"&";
	pagina = pagina.substring(0,pagina.length-1);
	location.href=pagina;
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

function getPick(idpick){
	var url = API_BASE_URL + '/' + idpick;
	

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var anuncio = data;
				
				var respuesta = $.parseJSON(jqxhr.responseText);				
				// $('<div class="item active" id="im1"><img class="imgcenterr" width="130" height="130" align=left src="'+respuesta.partidos[i].imageURL2+'">').appendTo($('#result_anuncios'));
				// $('<div class="item active"><img class="imgcenter"  width="130" height="180" align=left src="'+respuesta.partidos[i].imageURL3+'"').appendTo($('#result_anuncios'));
				// $('<div class="item active"><img class="imgcenterr"  width="130" height="130" align=left src="'+respuesta.partidos[i].imageURL1+'"').appendTo($('#result_anuncios'));
				// $('<br>').appendTo($('#result_anuncios'));
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
				$('<FONT class="texts" color="#F78A0E"><strong> Equipo Visitante: </strong></FONT><FONT color="#FFFFFF">' + pick.idpick + '</FONT><br>' ).appendTo($('#result_anuncios'));
				$('<FONT class="texts" color="#F78A0E"><strong> Equipo Local: </strong> </FONT><FONT color="#FFFFFF">' + pick.partido + '</FONT><br>').appendTo($('#result_anuncios'));
				$('<FONT class="texts" color="#F78A0E"><strong> Lugar del Partido: </strong> </FONT><FONT color="#FFFFFF">' + pick.username + '</FONT><br>').appendTo($('#result_anuncios'));
				$('<FONT class="texts" color="#F78A0E"><strong> Jornada Número: </strong> </FONT><FONT color="#FFFFFF">' + pick.opciones_pick + '</FONT><br>').appendTo($('#result_anuncios'));
				$('<FONT class="texts" color="#F78A0E"><strong> Jornada Número: </strong> </FONT><FONT color="#FFFFFF">' + pick.ganado + '</FONT><br>').appendTo($('#result_anuncios'));
				$('<FONT class="texts" color="#F78A0E"><strong> Jornada Número: </strong> </FONT><FONT color="#FFFFFF">' + pick.texto + '</FONT><br>').appendTo($('#result_anuncios'));
				$('<br>').appendTo($('#result_anuncios'));
				$('<br>').appendTo($('#result_anuncios'));
				$('<br>').appendTo($('#result_anuncios'));
				var fecha = new Date(pick.creation_timestamp).toGMTString();
				$('<FONT class="textss" color="#F78A0E"> Publicado: </FONT>' + fecha + '<br>').appendTo($('#result_anuncios'));
				$('<pre style=display:inline>&#09</pre>').appendTo($('#result_anuncios'));
				$('<a class="boton rojo" onclick="DeleteFavorito('+idanuncio+')" id="favorito" align=right>Eliminar Favorito</a>').appendTo($('#result_anuncios'));
				$('<br>').appendTo($('#result_anuncios'));
				$('<br>').appendTo($('#result_anuncios'));
				
	}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Error!</strong> Favorito no encontrado </div>').appendTo($("#result_anuncios"));
	});
	
	
}

function GetPick(i) {
	
	window.location= "getpartidologeado.html";
	pasarVariables ('getpartidologeado.html',i);
	$('getpartidologeado.html').ready(function(){
	});
}
function DeleteFavorito(id) {
	var url = API_BASE_URL_FAVORITOS+ '/' + id;

	$
			.ajax({
					
					headers : {
					'Authorization' : "Basic " + btoa(username + ':' + password)
					},
						
						url : url,
						type : 'DELETE',
						crossDomain : true,
						dataType : 'json',
					})
			.done(
					function(data, status, jqxhr) {
						alert ("Favorito Eliminado OK!!")
						window.location= "getfavoritos.html";
						$('getfavoritos.html').ready(function(){
						});
					})
			.fail(
					function() {
						alert ("Error al Eliminar el Anuncio!!")
					});
					
}
$("#button_exit").click(function(e) {
    e.preventDefault();
	  if(($.removeCookie('password'))&&($.removeCookie('rolename'))) {
			if($.removeCookie('username')) {
			$('#saludo_user').html('<p>Sesion cerrada!!</strong></FONT>');
			window.setTimeout('window.location.replace("index.html")', 2000); // refresh after 2 sec
			}
	  }
 });
