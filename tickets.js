// json API https://reqres.in/api/users?page=2

 /* Objetivo: Al momento de presionar el botón “Resumen”, deberá mostrar en la 
    sección “Total a Pagar: $”, el monto correspondiente a la cantidad de tickets a comprar 
    con el descuento correspondiente dependiendo la categoría seleccionada, existen 3 categorías, 
    Estudiante, Trainee, Junior */

function obtenerDatosHtml() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var correo = document.getElementById("correo").value;
    var cantidad = document.getElementById("cantidad").value;
    var seleccion = document.getElementById("seleccion").options[document.getElementById("seleccion").selectedIndex].text;

    return {nombre, apellido, correo, cantidad, seleccion};
}

function resetForm() {
    HTMLFormElement.reset();
}

function borrarForm() {

    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("seleccion").selectedIndex = 0;
    document.getElementById("total").innerHTML = "Total a Pagar: $";

    enabledForm();

}

function enabledForm() {

    document.getElementById("nombre").disabled = false;
    document.getElementById("apellido").disabled = false;
    document.getElementById("correo").disabled = false;
    document.getElementById("cantidad").disabled = false;
    document.getElementById("seleccion").disabled = false;
    document.getElementById('btn-abrir-popup-borrar').disabled = true;
    document.getElementById('btn-abrir-popup-resumen').disabled = false;

}

function calcularTotal() {
    let cant = document.getElementById("cantidad").value;
    let selec = document.getElementById("seleccion").selectedIndex;
    let total_compra = 0;
 
    if (selec === 1) {
        total_compra = 200 * cant * 0.50 
    } else if (selec === 2) {
        total_compra = 200 * cant * 0.85 
    } else {
        total_compra = 200 * cant * 0.2
    };
    return total_compra
}

function guardarLocal() {
    // Chequea si LocalStorage es soportado. (no soporta todos los navegadores)
    if (localStorage) {
        
        datos = obtenerDatosHtml();
        
        // Salva los datos en el localStorage.
        localStorage.setItem("nombre", datos.nombre);
        localStorage.setItem("apellido", datos.apellido);
        localStorage.setItem("correo", datos.correo);
        localStorage.setItem("cantidad", datos.cantidad);
        localStorage.setItem("seleccion", datos.seleccion);

    }
}

function abrirPopupResumen() {

    datos = obtenerDatosHtml();

    let lbNyA = document.getElementById("lb-nombre-y-apellido")
    let lbCorreo = document.getElementById("lb-correo")
    let lbCantidad = document.getElementById("lb-cantidad")
    let lbCategoria = document.getElementById("lb-categoria")
    let lbTotal = document.getElementById("lb-total")

    lbNyA.textContent = "Nombre y Apellido: " + datos.nombre + " " + datos.apellido;
    lbCorreo.textContent = "Correo Electrónico: " + datos.correo;
    lbCantidad.textContent = "Cantidad de entradas: " + datos.cantidad;
    lbCategoria.textContent = "Categoría: " + datos.seleccion;
    lbTotal.textContent = "Total a pagar: $ " + calcularTotal().toString();

}

function aceptarResumen() {

    guardarLocal();
    document.getElementById("total").innerHTML = "Total a Pagar: $" + " " + calcularTotal().toString();

}


// Event Listener boton Resumen (tickets.html)

var btnAbrirPopupResumen = document.getElementById('btn-abrir-popup-resumen'),
    	overlay = document.getElementById('overlay'),
    	popup = document.getElementById('popup');

    btnAbrirPopupResumen.addEventListener('click', function(event){
        event.preventDefault();
        abrirPopupResumen();
    	overlay.classList.add('active');
    	popup.classList.add('active');
    }); 

var btnCerrarPopup = document.getElementById('btn-cerrar-popup'),
    overlay = document.getElementById('overlay'),
    popup = document.getElementById('popup');
    
btnCerrarPopup.addEventListener('click', function(event){
    event.preventDefault();
    overlay.classList.remove('active');
    popup.classList.remove('active');
});

// Event Listener boton Aceptar del popup Resumen (tickets.html)

var btnAceptarPopupResumen = document.getElementById('btn-aceptar-popup-resumen'),
    overlay = document.getElementById('overlay'),
    popup = document.getElementById('popup'),
    btnResumenDisabled = document.getElementById('btn-abrir-popup-resumen'),
    btnBorrarEnabled = document.getElementById('btn-abrir-popup-borrar'),
    objNombre = document.getElementById("nombre"),
    objApellido = document.getElementById("apellido"),
    objCorreo = document.getElementById("correo"),
    objCantidad = document.getElementById("cantidad"),
    objSeleccion = document.getElementById("seleccion");

    
btnAceptarPopupResumen.addEventListener('click', function(event){
    event.preventDefault();
    aceptarResumen();
    overlay.classList.remove('active');
    popup.classList.remove('active');
    btnResumenDisabled.disabled = true;
    btnBorrarEnabled.disabled = false;
    objNombre.disabled = true;
    objApellido.disabled = true;
    objCorreo.disabled = true;
    objCantidad.disabled = true;
    objSeleccion.disabled = true;
});

// Event Listener boton Borrar (tickets.html)

var btnAbrirPopupBorrar = document.getElementById('btn-abrir-popup-borrar'),
    	overlayBorrar = document.getElementById('overlay-borrar'),
    	popupBorrar = document.getElementById('popup-borrar');

    btnAbrirPopupBorrar.addEventListener('click', function(event){
        event.preventDefault();
    	overlayBorrar.classList.add('active');
    	popupBorrar.classList.add('active');
    }); 

var btnCerrarPopupBorrar = document.getElementById('btn-cerrar-popup-borrar'),
    overlayBorrar = document.getElementById('overlay-borrar'),
    popupBorrar = document.getElementById('popup-borrar');
    
btnCerrarPopupBorrar.addEventListener('click', function(event){
    event.preventDefault();
    overlayBorrar.classList.remove('active');
    popupBorrar.classList.remove('active');
});


// Event Listener boton Aceptar del popup Borrar (tickets.html)

var btnAceptarPopupBorrar = document.getElementById('btn-aceptar-popup-borrar'),
    overlayBorrar = document.getElementById('overlay-borrar'),
    popupBorrar = document.getElementById('popup-borrar');
    
btnAceptarPopupBorrar.addEventListener('click', function(event){
    event.preventDefault();
    borrarForm();
    overlayBorrar.classList.remove('active');
    popupBorrar.classList.remove('active');

});

