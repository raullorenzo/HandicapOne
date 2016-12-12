var API_BASE_URL_FAVORITOS = 'http://localhost:8080/handicap-api/favoritos/';
var API_BASE_URL = 'http://localhost:8080/handicap-api/users/';
var API_BASE_URL_LOGIN = 'http://localhost:8080/handicap-api';
var API_BASE_URL_PRECIOS = 'http://localhost:8080/handicap-api/partidos/idpartidos/'
var API_BASE_URL_PROVINCIAS = 'http://localhost:8080/handicap-api/picks/'
var lastFilename;
var username = getCookie('username');





$(document).ready(function(){

	$('<p>Bienvenido, '+username +'</p>').appendTo($('#saludo_user'));

	var url = API_BASE_URL + username;
	var url2 = API_BASE_URL_FAVORITOS + username;
	console.log(url);
	console.log(url2);
	getUser(url);
	getFavoritos(url2);
	
});

function getUser(url) {
	
	$("#result_anuncios").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var user = data;

				$("#result_anuncios").text('');
				$('<div class="item active" id="im1"><img  src="' + user.imageURL + '"></div>').appendTo($('#imagenperfil'));
				$('<div class="perfilusers"><strong> Nombre:  &nbsp; &nbsp;</strong><text class="kkk">' + user.name + '</text></div><hr class="se"><hr class="se">').appendTo($('#result_anuncios'));
				$('<div class="perfilusers"><strong> Username: </strong><text class="kkk">' + user.username + '</text></div><hr class="se"><hr class="se">').appendTo($('#result_anuncios'));
				$('<div class="perfilusers"><strong> Email: </strong><text class="kkk">' + user.email + '</text></div><hr class="se"><hr class="se">').appendTo($('#result_anuncios'));

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#result_anuncios"));
	});

}

// function getFav(url2) {
	
// 	$("#result_anuncios").text('');

// 	$.ajax({
// 		url : url,
// 		type : 'GET',
// 		crossDomain : true,
// 		dataType : 'json',
// 	}).done(function(data, status, jqxhr) {

// 				var user = data;

// 				$("#result_anuncios").text('');
// 				$('<div class="item active" id="im1"><img  src="' + user.imageURL + '"></div>').appendTo($('#imagenperfil'));
// 				$('<div class="perfilusers"><strong> Nombre:  &nbsp; &nbsp;</strong><text class="kkk">' + user.name + '</text></div><hr class="se"><hr class="se">').appendTo($('#result_anuncios'));
// 				$('<div class="perfilusers"><strong> Username: </strong><text class="kkk">' + user.username + '</text></div><hr class="se"><hr class="se">').appendTo($('#result_anuncios'));
// 				$('<div class="perfilusers"><strong> Email: </strong><text class="kkk">' + user.email + '</text></div><hr class="se"><hr class="se">').appendTo($('#result_anuncios'));

// 			}).fail(function() {
// 				$('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#result_anuncios"));
// 	});

// }

//__________


function FavoritoCollection(favoritoCollection, respuesta, favoritos){
	this.favoritos = favoritoCollection;	
	var instance = this;


	
	this.links = buildLinks(favoritos.links);
	var instance = this;
	this.getLink = function(rel){
		return this.links[rel];
	}
	
	console.log ("hola");
	this.toHTML = function(){
		var html = '';
		$.each(this.favoritos, function(i, v) {
			var favorito = v;
			var idfavorito = favorito.idfavorito;
			html = html.concat('<div class="perfilusers"><strong> Usuario:  &nbsp; &nbsp;</strong><text class="kkk">' + favorito.username + '</text></div><hr class="se"><hr class="se">');
			html = html.concat('<div class="perfilusers"><strong> Partido:  &nbsp; &nbsp;</strong><text class="kkk">' + favorito.idpick + '</text></div><hr class="se"><hr class="se">');
			// html = html.concat('');
			// html = html.concat('');
			// html = html.concat('<a class="boton verde" href="" onclick="getPartido('+idpartido+')" id="anuncio" align=left>Entrar</a><br>');
			// html = html.concat('<br>');
			// html = html.concat('<hr size="4"  />');
			
			
		});
		

		
      var next = this.getLink('before');
			
		if (next != null) {
			url = next.href.split("?");
			final= url[1].split("=");
			if (final[1]=='0'){
				html = html.concat('<a class="boton azul" onClick="getPrincipio()" id="next" align=right>Volver al principio</a>');
			}
			else{
			//html = html.concat ('<pre style=display:inline>&#09</pre>');
				html = html.concat('<a class="boton2 azul" onClick="getFavoritos(\'' + next.href + '\')" id="next" align=right>Cargar Siguientes</a>');
			}
			$("#result_anuncios2").text('');
			// $('<a class="boton3 azul" onClick="getPrincipio()" id="next" align=right>Volver al principio</a>').appendTo($('#result_anuncios2'));

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

function getFavoritos(url2){

	$("#result_anuncios2").text('');
	
	$.ajax({
		url : url2,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr){
				var response = data.favoritos;
				var favoritos= data;
				var respuesta = $.parseJSON(jqxhr.responseText);
				var favoritoCollection = new FavoritoCollection(response, respuesta, favoritos);
				//var linkHeader = jqxhr.getResponseHeader('links');
				//console.log(linkHeader);
				//anuncioCollection.buildLinks(linkHeader);
				var html =favoritoCollection.toHTML();
				$("#result_anuncios2").html(html);
				
	}).fail(function(jqXHR, textStatus) {
		console.log(textStatus);
	});
}



function pasarVariables(pagina, i) {
	pagina +="?";
	pagina += i + "=" + escape(eval(i))+"&";
	pagina = pagina.substring(0,pagina.length-1);
	location.href=pagina;
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

