var API_BASE_URL = 'http://localhost:8080/handicap-api/partidos/';
var API_BASE_URL_LOGIN = 'http://localhost:8080/handicap-api';
var API_BASE_URL_PRECIOS = 'http://localhost:8080/handicap-api/partidos/idpartidos/'
var API_BASE_URL_PROVINCIAS = 'http://localhost:8080/handicap-api/picks/'
var lastFilename;
var username = getCookie('username');


$(document).ready(function(){

	$('<p>Bienvenido, '+username +'</p>').appendTo($('#saludo_user'));

	var url = API_BASE_URL;
	console.log(url);
	getPartidos(url);
	
});




function PartidoCollection(partidoCollection, respuesta, partidos){
	this.partidos = partidoCollection;	
	var instance = this;

	// this.buildLinks = function(header){
	// 	if (header != null ) {
	// 		this.links = weblinking.parseHeader(header);
	// 	} else {
	// 		this.links = weblinking.parseHeader('');
	// 	}
	// }

	// this.getLink = function(rel){
 //                return this.links.getLinkValuesByRel(rel);
	// }
	
	this.links = buildLinks(partidos.links);
	var instance = this;
	this.getLink = function(rel){
		return this.links[rel];
	}
	
	console.log ("hola");
	this.toHTML = function(){
		var html = '';
		$.each(this.partidos, function(i, v) {
			var partido = v;
			var idpartido = partido.idpartido;
			html = html.concat(
				'<div class="item active" id="im1"><img class="imgcenterr" width="130" height="130" align=left src="'+respuesta.partidos[i].imageURL2+'"' +  
				'<div class="item active"><img class="imgcenter"  width="130" height="180" align=left src="'+respuesta.partidos[i].imageURL3+'"' + 
				'<div class="item active"><img class="imgcenterr"  width="130" height="130" align=left src="'+respuesta.partidos[i].imageURL1+'"' );
			html = html.concat('<br>');
			html = html.concat('<br>');
			html = html.concat('<br>');
			html = html.concat('<br>');
			html = html.concat('<br>');
			html = html.concat('<br>');
			html = html.concat('<br>');
			html = html.concat('<br>');
			html = html.concat('<br>');
			html = html.concat('<br>');
			html = html.concat('<br>');
			html = html.concat('<br>');
			html = html.concat('<FONT class="texts" color="#F78A0E"><strong> Equipo Visitante: </strong></FONT><FONT color="#FFFFFF">' + partido.e_visitante + '</FONT><br>' + 
			'<FONT class="texts" color="#F78A0E"><strong> Equipo Local: </strong> </FONT><FONT color="#FFFFFF">' + partido.e_local + '</FONT><br>' + 
			'<FONT class="texts" color="#F78A0E"><strong> Lugar del Partido: </strong> </FONT><FONT color="#FFFFFF">' + partido.lugar + '</FONT><br>' +
			'<FONT class="texts" color="#F78A0E"><strong> Jornada Número: </strong> </FONT><FONT color="#FFFFFF">' + partido.jornada + '</FONT><br>' +
			'<FONT class="texts" color="#F78A0E"><strong> Resultado del partido: </strong></FONT><FONT color="#FFFFFF">' + partido.e_visitante + '</FONT><FONT color="#F78A0E"><strong> VS </strong></FONT><FONT color="#FFFFFF">' 
			+ partido.e_local + '</FONT><FONT color="#F78A0E"><strong> : </strong></FONT><FONT color="#FFFFFF">' + partido.puntuacionv + 
			'</FONT><FONT color="#F78A0E"><strong> - </strong></FONT><FONT color="#FFFFFF">' + partido.puntuacionl + '</FONT><br>');
			html = html.concat('<br>');
			html = html.concat('<br>');
			html = html.concat('<br>');
			var fecha = new Date(partido.creation_timestamp).toGMTString();
			html = html.concat('<FONT class="textss" color="#F78A0E"> Publicado: </FONT>' + fecha + '<br>');
			html = html.concat('<br>');
			html = html.concat('<a class="boton verde"  onclick="getPartido('+idpartido+')" id="anuncio" align=left>Entrar idp:'+idpartido+'</a><br>');
			html = html.concat('<a class="boton verde"  onclick="crearPick('+idpartido+')" id="cerrar2" align=left>Crear Pick idp:'+idpartido+'</a><br>');
			html = html.concat('<br>');
			html = html.concat('<hr size="4"  />');
			
			
		});
		
	

      /*  var prev = this.getLink('after');
		
		
		if (prev != null) {
			console.log (prev.href);
			html = html.concat('<a class="boton azul" onClick="getAnuncios(\'' + prev.href + '\')" id="prev" align=right>Anterior</a>');
			
		}*/
		
      var next = this.getLink('before');
			
		if (next != null) {
			url = next.href.split("?");
			final= url[1].split("=");
			if (final[1]=='0'){
				html = html.concat('<a class="boton azul" onClick="getPrincipio()" id="next" align=right>Volver al principio</a>');
			}
			else{
			//html = html.concat ('<pre style=display:inline>&#09</pre>');
				html = html.concat('<a class="boton2 azul" onClick="getPartidos(\'' + next.href + '\')" id="next" align=right>Cargar Siguientes ></a>');
			}
			$("#result_anuncios2").text('');
			$('<a class="boton3 azul" onClick="getPrincipio()" id="next" align=right>< Volver al principio</a>').appendTo($('#result_anuncios2'));

		}
		

 		return html;	
	}
}
function getPrincipio(){
	window.location= "registrado.html";
	pasarVariables ('registrado.html');
	$('registrado.html').ready(function(){
	});
}

function crearPick(i) {
	
	window.location= "pick.html";
	pasarVariables ('pick.html',i);
	$('pick.html').ready(function(){
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

function getPartido(i) {
	
	window.location= "partidoreg.html";
	pasarVariables ('partidoreg.html',i);
	$('partidoreg.html').ready(function(){
	});
}
function getPick(i) {
	
	window.location= "partidoreg.html";
	pasarVariables ('partidoreg.html',i);
	$('partidoreg.html').ready(function(){
	});
}

function pasarVariables(pagina, i) {
	pagina +="?";
	pagina += i + "=" + escape(eval(i))+"&";
	pagina = pagina.substring(0,pagina.length-1);
	location.href=pagina;
}

// $("#button_exit").click(function(e) {
//     e.preventDefault();
// 	  if(($.removeCookie('password'))&&($.removeCookie('rolename'))) {
// 			if($.removeCookie('username')) {
// 			$('#saludo_user').html('<p>Sesion cerrada!!</strong></FONT>');
// 			window.setTimeout('window.location.replace("index.html")', 2000); // refresh after 2 sec
// 			}
// 	  }
//  });

$("#button_exit").click(function(e) {
    e.preventDefault();
	  if(($.removeCookie('password'))&&($.removeCookie('rolename'))&&($.removeCookie('username'))) {
		$('#saludo_user').html('<p>Sesion cerrada!!</strong></FONT>');
		window.setTimeout('window.location.replace("index.html")', 2000); // refresh after 2 sec
	  }
 });


// $("#buttom_testuser").click(function(e) {
// 	e.preventDefault();
	
// 	setCookie('username', $("#user").val(),1)
// 	setCookie('password', $("#key").val(),1)
// 	GetRoles();
// 	Login();
// });

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

// function Login(){
	
	
// 	var user=new Object();
// 	var username = getCookie('username');
// 	var password = getCookie('password');
// 	var rolename = getCookie('rolename');
// 	var url= API_BASE_URL_LOGIN + '/users/login';
// 	user.username=username;
// 	user.password=password;

		
// 	var data = JSON.stringify(user);
	
// 	$.ajax({
// 		url:url,
// 		type:'POST',
// 		crossDomain: true,
// 		dataType:'json',
// 		contentType: 'application/vnd.partidos.api.user+json',
// 		data: data,
// 	}).done(function(data, status, jqxhr) {
// 				var info= data;
// 				if ((info.loginSuccessful == true)&&(rolename=="administrador")){
					
// 				window.location.replace("admin.html");

// 				}
// 				else if(rolename=="registrado"){
// 					window.location.replace("register.html");

// 				}
// 				else {		
// 				alert('contraseña incorrecta'); 
				
						      								
					
					
				
// 			}
		 

// 	}).fail(function() {
// 		 alert('Username o contraseña incorrectos');  
// 	});


// }




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

// $("#button_exit").click(function(e) {
//     e.preventDefault();
// 	  if($.removeCookie('password')) {
// 			if($.removeCookie('username')) {
			
// 			$('#logout').html('<FONT color="#F5F920"><strong>La sesion se ha cerrado con exito! Actualizando pagina principal ......</strong></FONT>');
// 			window.setTimeout('window.location.replace("index.html")', 2000); // refresh after 2 sec
// 			}
// 	  }
//  });
