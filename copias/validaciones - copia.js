/*Array donde guardamos la lista de los nombres*/
var arrayNombres = new Array();
class invitados{
  constructor(nombre){
    this.nombre = nombre;
  }
}

//Para el filtro
var ocultar = document.getElementById("ocultar");
var marcado = document.getElementById("marcado");

/*Evento al hacer click en enviar */
document.getElementById("submit").addEventListener("click", function(e){
	e.preventDefault();
	/*Para añadir invitados*/
	var aniadir = document.getElementById("meterDatos").value;
	comprobarNombre(aniadir);	
});

function comprobarNombre(comprobarN){
	//Comprobamos que la persona a la que queremos invitar no sea vacio y que no se repita en el array.
	if(comprobarN!=""){
		var mensajeError = document.getElementById("MensajeError");
		if(!arrayNombres.includes(comprobarN)){
			mensajeError.innerHTML= ""
			aniadirElementos(comprobarN);
			arrayNombres.push(comprobarN);
			console.log(arrayNombres)
		}else{
			mensajeError.innerHTML= "¡No puedes invitar a una persona que ya está invitado!"
			mensajeError.style.color = 'red';
		}
	}
}

/*Para añadir invitados*/
function aniadirElementos(aniadir){
		var obtenerUl = document.getElementById("invitedList");
		var newLi = document.createElement("li");
		obtenerUl.appendChild(newLi);

		var newSpan = document.createElement("span");
		newSpan.innerHTML=aniadir;
		//Para el modificar
		var newInputModi = document.createElement("input");
		newInputModi.setAttribute("type", "text");
		newInputModi.style.display = "none";
		newLi.appendChild(newInputModi);
		newLi.appendChild(newSpan);

		var newLabel = document.createElement("label");
		newLabel.innerHTML="Confirmed";
		newLi.appendChild(newLabel);
		
		var newInput = document.createElement("input");
		newInput.setAttribute("type", "checkbox");
		newLabel.appendChild(newInput);

		/*Para los checkbox*/
		newInput.addEventListener("click",function(e){
			/*Si confirmas asistencia*/
			if(newInput.checked == true){
				newLi.setAttribute("class", "responded");
			}
			/*Si no asistes*/
			else{
				newLi.setAttribute("class", "");
			}
		});

		//Boton de editar
		var newButton = document.createElement("button");
		newButton.innerHTML="edit";	
		newButton.setAttribute("type", "submit");
		newButton.setAttribute("name", "editar");
		newButton.setAttribute("value", "editar");
		newLi.appendChild(newButton);


		/*Para crear boton borrado*/
		var newButton2 = document.createElement("button");
		newButton2.innerHTML="remove";
		newLi.appendChild(newButton2);

		
		//Boton de guardar
		var newButtonSave = document.createElement("button");
		newButtonSave.innerHTML="save";	
		newButtonSave.setAttribute("type", "submit");
		newButtonSave.setAttribute("name", "save");
		newButtonSave.setAttribute("value", "save");
		newButtonSave.style.display = "none";
		newLi.appendChild(newButtonSave);

		//Boton cancelar
		var newButtonCancel = document.createElement("button");
		newButtonCancel.innerHTML="cancel";	
		newButtonCancel.setAttribute("type", "submit");
		newButtonCancel.setAttribute("name", "cancel");
		newButtonCancel.setAttribute("value", "cancel");
		newButtonCancel.style.display = "none";
		newLi.appendChild(newButtonCancel);

		
		/*Para cuando quieres editar*/
		newButton.addEventListener("click", function(){
			//ocultamos el span
			newSpan.style.display = "none";
			
			//mostramos la caja de texto
			newInputModi.style.display = "block";
			
			//ocultamos el boton de edit
			newButton.style.display = "none"
			
			//mostramos el boton de guardar
			newButtonSave.style.display = "inline";
			
			//ocultamos el boton de remove
			newButton2.style.display = "none"
			
			//mostramos el boton de cancelar
			newButtonCancel.style.display = "inline";

			//Boton guardar.
			newButtonSave.addEventListener("click", function(){
				var valorInputModificar =newInputModi.value;
				//Recorremos el array
				for (var i = 0; i < arrayNombres.length; i++) {
					//Si son iguales reemplazamos por el nuevo valor.
					if(newSpan.textContent == arrayNombres[i] && valorInputModificar !=""){
						arrayNombres[i]=valorInputModificar;
						console.log(arrayNombres);
						//Mostramos el span
						newSpan.style.display = "block";
						
						//Ocultamos la caja de texto
						newInputModi.style.display = "none";
						
						//le asignamos el nuevo valor.
						newSpan.textContent=arrayNombres[i];
						
						//Mostramos el boton de editar
						newButton.style.display = "inline"
						
						//Ocultamos el boton de guardar
						newButtonSave.style.display = "none";
						
						//Mostramos el boton de borrar
						newButton2.style.display = "inline";
						
						//Ocultamos el boton de cancelar
						newButtonCancel.style.display = "none";

					}
				}
			});

			/*Para cuando quieres cancelar*/
			newButtonCancel.addEventListener("click",function(){
						//Mostramos el span
						newSpan.style.display = "block";

						//Ocultamos la caja de texto
						newInputModi.style.display = "none";

						//Mostramos el boton de editar
						newButton.style.display = "inline"

						//Ocultamos el boton de guardar
						newButtonSave.style.display = "none";

						//Mostramos el boton de borrar
						newButton2.style.display = "inline";		

						//Ocultamos el de cancelar
						newButtonCancel.style.display = "none";
			});
		});

		/*Para el evento de borrar*/
		newButton2.addEventListener("click",function(){
    	var opcion = confirm("¿Seguro que quieres eliminar a este invitado?");
	    	if (opcion == true) {
	    		//Recorremos el array para luego eliminar el elemento que queremos
				for (var i = 0; i < arrayNombres.length; i++) {
					if(newSpan.textContent == arrayNombres[i]){
		            	arrayNombres.splice(i,1);
		            	console.log(arrayNombres);
		            	obtenerUl.removeChild(newLi);
		    		}	
				}
			}
		});

		/*Filtros para sabe quien asiste*/
		ocultar.addEventListener("click",function(e){
			//Comprobamos que este marcado el check de confirmado y que el atributo de la clase sea distinto a responded para ocultarlo.
			if(marcado.checked==true && newLi.getAttribute("class") != "responded"){
				newLi.style.display = "none";
			}else{
				newLi.style.display = "block";
			}
		});
}
