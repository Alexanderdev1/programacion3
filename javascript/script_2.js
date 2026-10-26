/*Scripts: logica de Javascript
Seccion1: Logica: Calculadora de promedio 
*/

const btnPromedio = document.getElementById("btnPromedio");
const resultadoPromedio = document.getElementById("resultadoPromedio");

btnPromedio.addEventListener("click", () => {
  const n1 = parseFloat(document.getElementById("nota1").value);
  const n2 = parseFloat(document.getElementById("nota2").value);
  const n3 = parseFloat(document.getElementById("nota3").value);

  //Validar que las tres notas sean numeros
  if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
    resultadoPromedio.textContent = "Debes ingresar las 3 notas";
    return;
  }

  const promedio = (n1 + n2 + n3) / 3;
  let mensaje = `Promedio: ${promedio.toFixed(2)} -`;

  //COndicional para clasificar el resultado
  if (promedio >= 4.5) mensaje += "Excelente";
  else if (promedio >= 3.5) mensaje += "Buen trabajo";
  else if (promedio >= 3.0) mensaje += "3 es nota el reto es plisvalia";
  else mensaje += "Perdiste :/";

  resultadoPromedio.textContent = mensaje;
});

//seccion 2: DOM - Funciones Demo

const textoDemo = document.getElementById("textoDemo");

function cambiarTexto() {
  textoDemo.textContent = "El texto cambio dinamicamente";
}

function cambiarColor() {
  textoDemo.style.color = "#25f78e";
}

function cambiarEstilos() {
  textoDemo.classList.add("destacado");
  textoDemo.style.background = "#2533f7";
  textoDemo.style.color = "white";
}

function resetearDemo() {
  textoDemo.textContent = "Este texto cambiara segun el boton que presione";
  textoDemo.style.color = "";
  textoDemo.style.background = "#eef2f7";
  textoDemo.classList.remove("destacado");
}

//Seccion3: Event Listeners

//Contador
let contador = 0;
const displayContador = document.getElementById("contador");

document.getElementById("btnMas").addEventListener('click', ()=>{
    contador++;
    displayContador.textContent = contador;
})

document.getElementById("btnMenos").addEventListener('click', ()=>{
    contador--;
    displayContador.textContent = contador;
})

document.getElementById("btnReset").addEventListener("click", ()=>{
    contador=0;
    displayContador.textContent = contador;
});

//Entrada de texto en vivo
const inputNombre = document.getElementById("inputNombre");
const salidaNombre = document.getElementById("salidaNombre");

inputNombre.addEventListener("input", (evento)=>{
    const valor = evento.target.value;
    salidaNombre.textContent = valor === ""
    ? "Aqui veras lo que escribas"
    : `Hola, ${valor}! Tienes ${valor.length} caracteres`
});


//Lista Dinamica
const inputTarea = document.getElementById("inputTarea");
const btnAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");

btnAgregar.addEventListener("click", () => {
  const texto = inputTarea.value.trim();

  if (texto === "") {
    alert("Escribe una tarea primero");
    return;
  }

  //Creacion del elemento <li>
  const li = document.createElement("li");
  li.innerHTML = `<span>${texto}</span>`;

  btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";

  btnEliminar.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(btnEliminar);
  listaTareas.appendChild(li);
  inputTarea.value = "";
  inputTarea.focus();
});
///END COMPLETAR

//Permitir el infreso con Enter
inputTarea.addEventListener("keydown", (e) => {
  if (e.key == "Enter") btnAgregar.click();
});

//Seccion4: Consola(Espejo Visual)
const consolaEspejo = document.getElementById("consolaEspejo");

//Funciones originales
const _log = console.log;
const _warn = console.warn;
const _error = console.error;
const _info = console.info;
const _table = console.table;


function agregarLineaEspejo(tipo, mensaje) {
    //Se limpia el aviso Inicial 
    if (consolaEspejo.querySelector('.line')?.textContent.includes('apareceran aqui')){
        consolaEspejo.innerHTML = '';
    }
    const linea = document.createElement("div");
    linea.className = `line ${tipo}`;
    linea.textContent = `[${tipo.toUpperCase()}] ${mensaje}`;
    consolaEspejo.appendChild(linea);
    consolaEspejo.scrollTop = consolaEspejo.scrollHeight;
}

console.log         =(...args) => {_log(...args);  agregarLineaEspejo("log", args.join(" "));}
console.warn        =(...args) => {_log(...args);  agregarLineaEspejo("warn", args.join(" "));}
console.error       =(...args) => {_log(...args);  agregarLineaEspejo("error", args.join(" "));}
console.info        =(...args) => {_log(...args);  agregarLineaEspejo("info", args.join(" "));}
console.table       =(data) =>{
    _table(data);
    agregarLineaEspejo("log", "Tabla mostrada en consola real (F12)");
};

//Seccion 5: Javascript Puro VS JQuery
const cajaDemoJQ = document.getElementById("cajaDemoJQ");

//Con JavaScript
document.getElementById("btnJS").addEventListener("click", ()=>{
    cajaDemoJQ.textContent = "Modificacion con Javascript puro";
    cajaDemoJQ.style.background = "#cfe2ff";
    cajaDemoJQ.style.color = "#084298";
})

//con JQuery
$("#btnJQ").on("click", function () {
    $("#cajaDemoJQ")
    .text("Modificacion con JQuery")
    .css({
        "background": "#eef2f7",
        "color": "#1e1e2e"
    });
});

//Navehacion Suave
document.querySelectorAll('nav.main-nav a').forEach(enlace =>{
    enlace.addEventListener("click", (e)=>{
        e.preventDefault();
        const destino = document.querySelector(enlace.getAttribute("href"));
        if(destino){
            window.scrollTo({
                top:destino.offsetTop -100,
                behavior: "smooth"
            });
        }
    });
});

//Mensaje de Bienvenida en consola
console.log("Guia de Javascript cargada correctamente");
console.info("Abre la consola con (F12) para ver los mensajes de los demos.");



//EJERCICIOS CODIGO

// RETO 1
const btnReto1 = document.getElementById("btnReto1");
const resultadoReto1 = document.getElementById("resultadoReto1");

btnReto1.addEventListener("click", () => {
  const temperatura = parseFloat(document.getElementById("tempReto1").value);

  //Validar que sea un numero
  if (isNaN(temperatura)) {
    resultadoReto1.textContent = "Ingresa una temperatura valida";
    return;
  }

  if (temperatura < 10) resultadoReto1.textContent = "Hace frio";
  else if (temperatura <= 25) resultadoReto1.textContent = "Temperatura templada";
  else resultadoReto1.textContent = "Hace calor";
});


// RETO 2
const inputReto2 = document.getElementById("inputReto2");
const btnReto2 = document.getElementById("btnReto2");
const listaReto2 = document.getElementById("listaReto2");

btnReto2.addEventListener("click", () => {
  const texto = inputReto2.value.trim();

  if (texto === "") {
    alert("Escribe algo primero");
    return;
  }


  const li = document.createElement("li");
  li.innerHTML = `<span>${texto}</span> `;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";

  btnEliminar.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(btnEliminar);
  listaReto2.appendChild(li);
  inputReto2.value = "";
  inputReto2.focus();
});

inputReto2.addEventListener("keydown", (e) => {
  if (e.key == "Enter") btnReto2.click();
});


// RETO 3
const btnReto3 = document.getElementById("btnReto3");
const resultadoReto3 = document.getElementById("resultadoReto3");

btnReto3.addEventListener("click", () => {
  const pesos = parseFloat(document.getElementById("pesosReto3").value);

  if (isNaN(pesos) || pesos < 0) {
    resultadoReto3.textContent = "Ingresa un valor valido";
    return;
  }

  
  const dolares = pesos / 2000;
  const euros = pesos / 3000;

  resultadoReto3.textContent = `${dolares.toFixed(2)} dolares - ${euros.toFixed(2)} euros`;
});


// RETO 4
const resultadoReto4 = document.getElementById("resultadoReto4");

function sumar() {
  const a = parseFloat(document.getElementById("num1Reto4").value);
  const b = parseFloat(document.getElementById("num2Reto4").value);

  if (isNaN(a) || isNaN(b)) {
    resultadoReto4.textContent = "Ingresa los dos numeros";
    return;
  }
  resultadoReto4.textContent = `Resultado: ${a + b}`;
}

function restar() {
  const a = parseFloat(document.getElementById("num1Reto4").value);
  const b = parseFloat(document.getElementById("num2Reto4").value);

  if (isNaN(a) || isNaN(b)) {
    resultadoReto4.textContent = "Ingresa los dos numeros";
    return;
  }
  resultadoReto4.textContent = `Resultado: ${a - b}`;
}

function multiplicar() {
  const a = parseFloat(document.getElementById("num1Reto4").value);
  const b = parseFloat(document.getElementById("num2Reto4").value);

  if (isNaN(a) || isNaN(b)) {
    resultadoReto4.textContent = "Ingresa los dos numeros";
    return;
  }
  resultadoReto4.textContent = `Resultado: ${a * b}`;
}

function dividir() {
  const a = parseFloat(document.getElementById("num1Reto4").value);
  const b = parseFloat(document.getElementById("num2Reto4").value);

  if (isNaN(a) || isNaN(b)) {
    resultadoReto4.textContent = "Ingresa los dos numeros";
    return;
  }
  if (b === 0) {
    resultadoReto4.textContent = "No se puede dividir entre cero";
    return;
  }
  resultadoReto4.textContent = `Resultado: ${a / b}`;
}

document.getElementById("btnSumar").addEventListener("click", sumar);
document.getElementById("btnRestar").addEventListener("click", restar);
document.getElementById("btnMultiplicar").addEventListener("click", multiplicar);
document.getElementById("btnDividir").addEventListener("click", dividir);


// RETO 5: Portafolio con jQuery (el termometro rehecho con jQuery)
$("#btnReto5").on("click", function () {
  const temperatura = parseFloat($("#tempReto5").val());

  if (isNaN(temperatura)) {
    $("#resultadoReto5").text("Ingresa una temperatura valida");
    return;
  }

  if (temperatura < 10) $("#resultadoReto5").text("Hace frio");
  else if (temperatura <= 25) $("#resultadoReto5").text("Temperatura templada");
  else $("#resultadoReto5").text("Hace calor");
});