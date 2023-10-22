// json API https://reqres.in/api/users?page=2

function borrarForm() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("seleccion").selectedIndex = 0;
    document.getElementById("total").innerHTML = "Total a Pagar: $";
}

function reset() {
    HTMLFormElement.reset()
}

function resumen() {
    document.querySelector('form').addEventListener('submit', function(event) { 
        
        event.preventDefault(); // Evita refresh de la página

        /* Al momento de presionar el botón “Resumen”, deberá mostrar en la 
        sección “Total a Pagar: $”, el monto correspondiente a la cantidad de tickets a comprar 
        con el descuento correspondiente dependiendo la categoría seleccionada, existen 3 categorías, 
        Estudiante, Trainee, Junior */
        

        //console.log("Total a Pagar: $ " + calcularTotal().toString());
        //console.log(document.getElementById("total").innerHTML + " " + calcularTotal().toString());
        
        
        guardarLocal();

        document.getElementById("total").innerHTML = "Total a Pagar: $" + " " + calcularTotal().toString();

    })

}

function guardarLocal() {
    // Chequea si LocalStorage es soportado. (no soporta todos los navegadores)
    if (localStorage) {
    
        // Agrega evento listener para el boton submit
        document.getElementById("tickets-form").addEventListener('submit', function() {
        // Obtiene los nombres de los campos y los guarda en sus respectivas variables.
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;
        let correo = document.getElementById("correo").value;
        let cantidad = document.getElementById("cantidad").value;
        let seleccion = document.getElementById("seleccion").selectedIndex;
        let total = document.getElementById("total").innerHTML + " " + calcularTotal().toString();
        
        // Salva los datos en el localStorage.
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("apellido", apellido);
        localStorage.setItem("correo", correo);
        localStorage.setItem("cantidad", cantidad);
        localStorage.setItem("seleccion", seleccion);
        localStorage.setItem("total", total);
        });
    }
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

var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
	overlay = document.getElementById('overlay'),
	popup = document.getElementById('popup'),
	btnCerrarPopup = document.getElementById('btn-cerrar-popup');

btnAbrirPopup.addEventListener('click', function(){
	overlay.classList.add('active');
	popup.classList.add('active');
});

btnCerrarPopup.addEventListener('click', function(e){
	e.preventDefault();
	overlay.classList.remove('active');
	popup.classList.remove('active');
});