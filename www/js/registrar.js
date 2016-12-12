var URL = 'http://localhost:8080/handicap-api/users';
var API_BASE_URL = 'http://localhost:8080/handicap-api/partidos/';
var API_BASE_URL_LOGIN = 'http://localhost:8080/handicap-api';
var API_BASE_URL_PRECIOS = 'http://localhost:8080/handicap-api/partidos/idpartidos/'
var API_BASE_URL_PROVINCIAS = 'http://localhost:8080/handicap-api/picks/'
var lastFilename;
// var username = getCookie('username');

$(document).ready(function(){

	var url = API_BASE_URL;
	console.log(url);
	getPartidos(url);

	
});


$('form').submit(function(e){
	e.preventDefault();
	$('progress').toggle();

	var formData = new FormData($('form')[0]);
	$.ajax({
		url: URL,
		type: 'POST',
		xhr: function() {  
	    	var myXhr = $.ajaxSettings.xhr();
	        if(myXhr.upload){ 
	            myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
	        }
	        return myXhr;
        },
		crossDomain : true,
		data: formData,
		cache: false,
		contentType: false,
        processData: false
	})
	.done(function (data, status, jqxhr) {

		var response = $.parseJSON(jqxhr.responseText);
		lastFilename = response.filename;
		$('<div class="alert alert-danger"> <strong>Registro ok!! </strong>  </div>').appendTo($("#result_registro"));
		alert("Usuario registrado correctamente!!");
		$('progress').toggle();
		$('form')[0].reset();
	})
    .fail(function (jqXHR, textStatus) {
    	alert("Lo sentimos, Usuario ya registrado");
		console.log(textStatus);
	});
});

function progressHandlingFunction(e){
    if(e.lengthComputable){
        $('progress').attr({value:e.loaded,max:e.total});
    }
}


/////////

function pasarVariables(pagina, i) {
	pagina +="?";
	pagina += i + "=" + escape(eval(i))+"&";
	pagina = pagina.substring(0,pagina.length-1);
	location.href=pagina;
}




// $("#buttom_testuser").click(function(e) {


// 	e.preventDefault();

// 	setCookie('username', $("#user").val(),1);
// 	setCookie('password', $("#key").val(),1);
// 	var rolename = GetRoles();
// 	// GetRoles();
// 	console.log("entro en boton log");
// 	Login();


// });

// function GetRoles() {
// 	console.log("GetRoles");
// 	console.log(username);
// 	var username = getCookie('username');
// 	var url= API_BASE_URL_LOGIN + '/users/roles/' +username;
	

// 	$.ajax({
// 		url : url,
// 		type : 'GET',
// 		crossDomain : true,
// 		dataType : 'json',
// 	}).done(function(data, status, jqxhr) {
// 		var rolename= data.rolename;
// 		setCookie('rolename', rolename,1)
						
// 	}).fail(function() {
// 		$('<div class="alert alert-danger"> <strong>Oh!</strong> File not found </div>').appendTo($("#result"));
// 	});

// }

// function Login(){
	


// 	var user= new Object();
// 	var username = getCookie('username');
// 	var password = getCookie('password');
// 	var rolename = getCookie('rolename');

	
// 	user.username=username;
// 	user.password=password;
// 	user.rolename=GetRoles();
// 	var url= API_BASE_URL_LOGIN + '/users/login';

// 	console.log(user);

		
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
// 				// if ((info.loginSuccessful == true)&&(rolename=="administrador")){
			
// 				// 	console.log("Entro en 1 if");
// 				// 	window.location.replace("admin.html");

// 				// }
// 				// else if (rolename=="registrado"){
// 				// 	window.location.replace("registrado.html");
// 				// }
// 				// else {		
// 				// 	alert('contraseña incorrecta'); 				
// 				// }	

// 				if (info.loginSuccessful == true){
// 					if (rolename=="administrador"){
// 						console.log("Entro en el admin");
// 						window.location.replace("admin.html");
// 					}
						
// 					else if (rolename=="registrado"){
// 						console.log("Entro en el reg");
// 						window.location.replace("registrado.html");
// 					}
// 					else {
// 						alert('contraseña incorrecta');
// 					}
// 				}

		 

// 	}).fail(function() {
// 		 alert('Username o contraseña incorrectos');  
// 	});


// }

$("#buttom_testuser").click(function(e) {
	e.preventDefault();
	
	setCookie('username', $("#user").val(),1)
	setCookie('password', $("#key").val(),1)
	// GetRoles();
	Login();
});

function GetRoles(op) {
	var username = getCookie('username');
	var password = getCookie('password');
	var url= API_BASE_URL_LOGIN + '/users/roles/' +username;

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
					var rolename= data.rolename;
					setCookie('rolename', rolename,1)

					
					
					if ((rolename=="administrador")&&(op==1)){
						console.log("Entro en el admin");
						window.location.replace("admin.html");
					}
						
					else if ((rolename=="registrado")&&(op==1)){
						console.log("Entro en el reg");
						window.location.replace("registrado.html");
					}
					else {
						alert('contraseña incorrecta');
					}

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
					var op = 1;
					GetRoles(op);

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

