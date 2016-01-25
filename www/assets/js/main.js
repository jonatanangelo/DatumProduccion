var path = "";

var header;
var home;
var menu;
var contacto;
var categoria;
var sondeo;
var datum;
var resumen;
var informe;

var data;
var pulsos;

var seccion = "home";

var produccion=true;


function ruta(str){
	return path+str;
}


$(document).ready(function(){


	
	var datos = new Datos();
	datos.iniciar();

	
});




function iniciar(){
	header = new Header();
	home = new Home();
	menu = new Menu();
	categoria = new Categoria();
	sondeo = new Sondeo();
	contacto = new Contacto();
	datum = new Datum();
	resumen = new Resumen();
	informe = new Informe();

	getContent({page:"home"},true);
}

window.onpopstate = function(event) {



	getContent(event.state,false);

};


function getContent(obj,addEntry){
	
	
	var antseccion = seccion;

	

	seccion=obj.page;


	switch(seccion){

		case "categoria":
			categoria.cargar(obj.keycat,obj.padre);
			break;
		case "sondeo":
			sondeo.cargar(obj.tema,obj.categoria);
			break;
		case "resumen":
			resumen.cargar(obj.pulso);
			break;
		case "informe":
			informe.cargar(obj.pulso);
			break;

	}
	if(seccion=="sondeo"){
		header.showMenu();
	}else{

		header.hideMenu();
	}
	if(seccion=="home") header.hideBack();
	else header.showBack();

	

	window[antseccion].ocultar();
	window[seccion].mostrar();

	if(addEntry == true) {
		history.pushState(obj,null); 
	}

	window.scrollTo(0,0);


}

var Datos = function(){
	this.iniciar = function(){
		$.ajax({
			//crossDomain: true,
			//url:"assets/data3.json",
			url:"http://181.177.230.181/datum/json.php",
			//url:"http://localhost/datum/app/DatumTerminado/www/assets/json.php",
			dataType:'jsonp',
			jsonp: 'jsoncallback',
			success: function(res, status){
				$("#home .area .texto").html(res.variables.textohome);
				data = res.data;
				pulsos = res.pulsos;
				iniciar()
			},
			error: function(){
				alert("Error cargando data");
			}
		});
	}
};


var Seccion = function(){
	this.dom = null;
	this.mostrar = function(){
		header.setTitulo(this.titulo);
		this.dom.show();
	}
	this.ocultar = function(){
		this.dom.hide();
	}
}

function compartir(titulo,image){
	var tit="";
	var ind = titulo.indexOf("<br");
	if(ind!=-1) tit = titulo.substr(0,ind);
	else tit = titulo;

	window.plugins.socialsharing.share("@DatumPeru #PulsoPerú "+tit, null, image, null);
}
