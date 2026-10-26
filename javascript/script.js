document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();


        //Remover la clase activa de todos los enlaces
        document.querySelectorAll("nav a").forEach(a=>{
            a.classList.remove("active");
        
        })

        //Añadir clase activa al enlace seleccionado
        this.classList.add("active");

        //Desplazamiento suave
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth"
        });
    });
})


//Retos

// RETO 1: Termometro
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


// RETO 2: Lista de compras
const inputReto2 = document.getElementById("inputReto2");
const btnReto2 = document.getElementById("btnReto2");
const listaReto2 = document.getElementById("listaReto2");

btnReto2.addEventListener("click", () => {
  const texto = inputReto2.value.trim();

  if (texto === "") {
    alert("Escribe algo primero");
    return;
  }

  //Creacion del elemento <li>
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

//Permitir el ingreso con Enter
inputReto2.addEventListener("keydown", (e) => {
  if (e.key == "Enter") btnReto2.click();
});


// RETO 3: Conversor de moneda (pesos colombianos a dolares y euros)
const btnReto3 = document.getElementById("btnReto3");
const resultadoReto3 = document.getElementById("resultadoReto3");

btnReto3.addEventListener("click", () => {
  const pesos = parseFloat(document.getElementById("pesosReto3").value);

  if (isNaN(pesos) || pesos < 0) {
    resultadoReto3.textContent = "Ingresa un valor valido";
    return;
  }

  //Tasas ficticias, las puedes cambiar
  const dolares = pesos / 4000;
  const euros = pesos / 4300;

  resultadoReto3.textContent = `${dolares.toFixed(2)} dolares - ${euros.toFixed(2)} euros`;
});


// RETO 4: Calculadora con event listeners
const resultadoReto4 = document.getElementById("resultadoReto4");

function obtenerNumeros() {
  const a = parseFloat(document.getElementById("num1Reto4").value);
  const b = parseFloat(document.getElementById("num2Reto4").value);

  if (isNaN(a) || isNaN(b)) {
    resultadoReto4.textContent = "Ingresa los dos numeros";
    return null;
  }
  return [a, b];
}

document.getElementById("btnSumar").addEventListener("click", () => {
  const numeros = obtenerNumeros();
  if (numeros) resultadoReto4.textContent = `Resultado: ${numeros[0] + numeros[1]}`;
});

document.getElementById("btnRestar").addEventListener("click", () => {
  const numeros = obtenerNumeros();
  if (numeros) resultadoReto4.textContent = `Resultado: ${numeros[0] - numeros[1]}`;
});

document.getElementById("btnMultiplicar").addEventListener("click", () => {
  const numeros = obtenerNumeros();
  if (numeros) resultadoReto4.textContent = `Resultado: ${numeros[0] * numeros[1]}`;
});

document.getElementById("btnDividir").addEventListener("click", () => {
  const numeros = obtenerNumeros();
  if (!numeros) return;

  if (numeros[1] === 0) {
    resultadoReto4.textContent = "No se puede dividir entre cero";
    return;
  }
  resultadoReto4.textContent = `Resultado: ${numeros[0] / numeros[1]}`;
});


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