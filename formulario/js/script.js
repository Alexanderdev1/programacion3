"use strict";

const formulario = documento.getElementById("formularioContacto");
const botonEnviar = document.getElementById("botonEnviar");
const mensajeEstado = document.getElementById("mensajeEstado");

formulario.addEventListener("submit", function(evento){
    if (formulario.checkValidity()){
        evento.preventDefault();
        formulario.reportValidity();
        return;
    }

    /**Validar que el nombre 
     */

    const nombre = document.getElementById("nombre").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const correo = document.getElementById("correo").value.trim();
    
    if(nombre.length === 0){
        evento.preventDefault();
        mensajeEstado.textContent = "Escribe tu nombre completo.";

        document.getElementById("nombre").focus();
        return;
    }

    if(mensaje.length === 0){
        evento.preventDefault();
        mensajeEstado.textContent = "Escribe el contenido de tu mensaje.";

        document.getElementById("mensaje").focus();
        return;
    }

    if(correo.length === 0){
        evento.preventDefault();
        mensajeEstado.textContent = "Escribe tu correo electronico";

        document.getElementById("correo").focus();
        return;
    }

    //Evitar que se de click repetivamente
    mensajeEstado.textContent = "";
    botonEnviar.disable = true;
    botonEnviar.textContent = "Enviando ....";
});


//boton enviar boton limpiar para elmiminar mensajes

formulario.addEventListener("reset", () => {
    mensajeEstado.textContent = "";
    botonEnviar.disable = false;
    botonEnviar.textContent = "Enviar mensaje";
});