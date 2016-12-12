var API_BASE_URL = 'http://localhost:8080/handicap-api/comentarios/';
var API_BASE_URL_LOGIN = 'http://localhost:8080/handicap-api';
var API_BASE_URL_PRECIOS = 'http://localhost:8080/handicap-api/partidos/idpartidos/'
var API_BASE_URL_PROVINCIAS = 'http://localhost:8080/handicap-api/picks/'
var lastFilename;


$(document).ready(function(){
	var url = API_BASE_URL;
	console.log(url);
	getComentarios(url);
	
});
//1. GET LISTA TODOS ANUNCIOS



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
			// html = html.concat(
			// 	'<div class="item active" id="im1"><img class="imgcenterr" width="130" height="130" align=left src="'+respuesta.partidos[i].imageURL2+'"' +  
			// 	'<div class="item active"><img class="imgcenter"  width="130" height="130" align=left src="'+respuesta.partidos[i].imageURL3+'"' + 
			// 	'<div class="item active"><img class="imgcenterr"  width="130" height="130" align=left src="'+respuesta.partidos[i].imageURL1+'"' );
			
			html = html.concat('<li class="event"><input type="radio" name="tl-group" checked/><img id="ball" src="images/favicon.png"><div class="thumb user-4"><span>19 Nov</span></div>');
			html = html.concat('<div class="content-perspective"><div class="content"><div class="content-inner">');
			html = html.concat('<h3>'+ comentario.username +'</h3><br>');
			html = html.concat('<p>'+ comentario.texto +'</p>');
			html = html.concat('</div></div></div></li>');
			var fecha = new Date(comentario.creation_timestamp).toGMTString();
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
function getPrincipio(){
window.location= "index.html";
	pasarVariables ('index.html');
	$('index.html').ready(function(){
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
		console.log(textStatus);
	});
}


function getAnuncio(i) {
	
	window.location= "getanunciofree.html";
	pasarVariables ('getanunciofree.html',i);
	$('getanunciofree.html').ready(function(){
	});
}

function pasarVariables(pagina, i) {
	pagina +="?";
	pagina += i + "=" + escape(eval(i))+"&";
	pagina = pagina.substring(0,pagina.length-1);
	location.href=pagina;
}




function getAnunciosCollection(url){

	$("#comentarios_result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr){
				var response = data.anuncios;
				var anuncios= data;
				var respuesta = $.parseJSON(jqxhr.responseText);
				var anuncioCollection = new Anuncios(response, respuesta, anuncios);
				//var linkHeader = jqxhr.getResponseHeader('links');
				//console.log(linkHeader);
				//anuncioCollection.buildLinks(linkHeader);
				var html =anuncioCollection.toHTML();
				$("#result_anuncios").html(html);
				
	}).fail(function(jqXHR, textStatus) {
		console.log(textStatus);
	});
}

$("#buttom_testuser").click(function(e) {
	e.preventDefault();
	
	setCookie('username', $("#user").val(),1)
	setCookie('password', $("#key").val(),1)
	GetRoles();
	Login();
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

function Login(){
	
	
	var user=new Object();
	var username = getCookie('username');
	var password = getCookie('password');
	var url= API_BASE_URL_LOGIN + '/users/login';
	user.username=username;
	user.password=password;
		
	var data = JSON.stringify(user);
	
	$.ajax({
		url:url,
		type:'POST',
		crossDomain: true,
		dataType:'json',
		contentType: 'application/vnd.partidos.api.user+json',
		data: data,
	}).done(function(data, status, jqxhr) {
				var info= data;
				if (info.loginSuccessful == true){
					
				window.location.replace("logeado.html");

				}
				else {		
				alert('contraseña incorrecta'); 
				
						      								
					
					
				
			}
		 

	}).fail(function() {
		 alert('Username o contraseña incorrectos');  
	});


}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
	
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


