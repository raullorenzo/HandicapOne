var API_BASE_URL_FAVORITOS = 'http://localhost:8080/handicap-api/favoritos/';
var API_BASE_URL = 'http://localhost:8080/handicap-api/users/';
var API_BASE_URL_LOGIN = 'http://localhost:8080/handicap-api';
var API_BASE_URL_PRECIOS = 'http://localhost:8080/handicap-api/partidos/idpartidos/'
var API_BASE_URL_PICKS = 'http://localhost:8080/handicap-api/picks/'
var lastFilename;
var username = getCookie('username');
var password = getCookie('password');
var rolename = getCookie('rolename');




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
		});
		
      var next = this.getLink('before');
			
 	  return html;	
	}
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
				console.log(favoritoCollection.favoritos);

				for(var contador = 0;contador < favoritoCollection.favoritos.length; contador++){
					var fav = favoritoCollection.favoritos[contador].idpick;
					var url3 = API_BASE_URL_PICKS + fav;
					console.log(favoritoCollection.favoritos[contador].idpick);
					console.log(url3);
					$.ajax({
						url : url3,
						type : 'GET',
						crossDomain : true,
						dataType : 'json',
					}).done(function(data, status, jqxhr){
								var respuesta = $.parseJSON(jqxhr.responseText);
								var fecha = new Date(data.creation_timestamp).toGMTString();
								console.log(data);
								//var linkHeader = jqxhr.getResponseHeader('links');
								//console.log(linkHeader);
								//anuncioCollection.buildLinks(linkHeader);
								//var html =data.texto.toHTML();
								// $("#result_anuncios2").html(data.texto);
								$('<br>').appendTo($('#result_anuncios2'));
								$('<br>').appendTo($('#result_anuncios2'));
								$('<hr>').appendTo($('#result_anuncios2'));
								$('<br>').appendTo($('#result_anuncios2'));
								$('<br>').appendTo($('#result_anuncios2'));
								$('<div class="perfilusers2">Pick:<br><br><text class="kkk2">'
								 + data.titulo + 
								'</text><br><br><a class="boton4 verde" onclick="getCom('+data.partido+')" id="pick" align=center>Entrar idp:'+data.partido+'</a></div>').appendTo($('#result_anuncios2'));
								$('<FONT class="textss" color="#F78A0E"> Publicado: </FONT>' + fecha + '<br>').appendTo($('#result_anuncios2'));



								
					}).fail(function(jqXHR, textStatus) {
						console.log(textStatus);
					});
				}
	}).fail(function(jqXHR, textStatus) {
		console.log(textStatus);
	});
}






function getCom(i) {
	
	window.location= "partidocomentadmin.html";
	pasarVariables ('partidocomentadmin.html',i);
	$('partidocomentadmin.html').ready(function(){
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

