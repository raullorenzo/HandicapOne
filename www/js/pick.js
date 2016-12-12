
var API_BASE_URL = 'http://localhost:8080/handicap-api/picks/';
var lastFilename;
var username = getCookie('username');
var password = getCookie('password');

// $.ajaxSetup({
//     headers: { 'Authorization': "Basic "+ btoa(username+':'+password) }
// })

$(document).ready(function(){

	$('<p>Bienvenido, '+username +'</p>').appendTo($('#saludo_user'));
	cadVariables = location.search.substring(1,location.search.length);
	arrVariables = cadVariables.split("=");
	var id = arrVariables[0];
	console.log(id);
	
});

$("#enviarpick").click(function(e){
	
	// if($('#textopick').val() == ""){
	// 	$('<div class="alert alert-info">Mensaje en blanco, debes escribir un mensaje </div>').appendTo($("#result_anuncios3"));
	// }
	// else{
	// d= datos.split(",");
	// idanuncio= d[0];
	// usuariorecibe=d[1];
	cadVariables = location.search.substring(1,location.search.length);
	arrVariables = cadVariables.split("=");
	var id = arrVariables[0];

	
	
	var tit = $('#titulopick').val();
	var txt = $('#textopick').val();
		Pick = {
			"partido" : id,
			"username" : username,
			"titulo" : tit,
			"opciones_pick" : 0,
			"ganado" : 0,
			"texto" : txt,
			
		}
		createPick(Pick);
		console.log(Pick);
	
});



function createPick(Pick) {
	var url = API_BASE_URL;
	var data = JSON.stringify(Pick);
	
	$("#result_anuncios3").text('');

	$.ajax({
		// headers : {
		// 	'Authorization' : "Basic " + btoa(username + ':' + password)
		// },
		contentType: 'application/vnd.partidos.api.partido+json',
		url : url,
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<input id="volver22" onclick="javascript:history.back(-1);" class="input-btn" type="button" value="Volver">').appendTo($("#result_anuncios3"));
		alert("Pick Creado!!");
  	}).fail(function() {
		// $('<input id="volver" class="input-btn" href="" type="button" value="Enviar">').appendTo($("#result_anuncios4"));
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
$("#cerrar").click(function(e) {
    e.preventDefault();
	  if($.removeCookie('password')) {
			if($.removeCookie('username')) {
			
			$('#logout').html('<FONT color="#F5F920"><strong>La sesion se ha cerrado con exito! Actualizando pagina principal ......</strong></FONT>');
			window.setTimeout('window.location.replace("index.html")', 2000); // refresh after 2 sec
			}
	  }
 });