var API_BASE_URL = 'http://localhost:8080/handicap-api/users/';
var API_BASE_URL_LOGIN = 'http://localhost:8080/handicap-api';
var API_BASE_URL_PRECIOS = 'http://localhost:8080/handicap-api/partidos/idpartidos/'
var API_BASE_URL_PROVINCIAS = 'http://localhost:8080/handicap-api/picks/'
var lastFilename;
var username = getCookie('username');





$(document).ready(function(){

	$('<p>Bienvenido, '+username +'</p>').appendTo($('#saludo_user'));

	var url = API_BASE_URL + username;
	console.log(url);
	getUser(url);
	
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


