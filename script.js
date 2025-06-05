
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function tablaMultiplicar(numero) {
    const padre = document.getElementById("resultadoMultiplicar");

    for (let i = 0; i <= 12; i++) {
        const resultado = parseFloat((numero * i).toFixed(2)); // to fixed(2) para limitar a 2 decimales
        generarElementoHijo(padre, "li", `${numero} x ${i} = ${resultado}`);
        // console.log(`${numero} x ${i} = ${resultado}`);
        await sleep(200); // Esperar medio segundo entre cada iteración
    }
}


function calculosMatematcios(){
    const numero1 = parseFloat(document.getElementById("numero1").value); // Obtener el primer número
    const numero2 = parseFloat(document.getElementById("numero2").value); // Obtener el segundo número
    const OP = document.getElementById("operaciones").value; // Obtener la operación seleccionada
    console.log(numero1, numero2, OP);
    let resultado;
        // asgegurarse que los campos sean numeros
    if (isNaN(numero1) || isNaN(numero2)) {
        alert("Por favor, ingrese números válidos.");
        return;
    }
    // const contenedorCualidades = document.getElementById("cualidadesMatematicas__lista");
    // contenedorCualidades.innerHTML = ""; // Limpiar la lista de cualidades matemáticas
    switch (OP) {
        case "Suma":
            resultado = numero1 + numero2;
            signo = "+";
            break;
        case "Resta":
            resultado = numero1 - numero2;
            signo = "-";
            break;
        case "Multiplicacion":
            resultado = numero1 * numero2;
            signo = "*";
            break;
        case "Division":
            if (numero2 === 0) {
                alert("No se puede dividir por cero.");
                return;
            }
            resultado = numero1 / numero2;
            signo = "/";
            break;
        default:
            alert("Operación no válida.");
            return;
    }
    document.getElementById("resultadoOP").textContent = resultado.toFixed(2); // Mostrar el resultado con 2 decimales
    cualidadesMatematicas(resultado); // Llamar a la función para mostrar las cualidades matemáticas del resultado
}

function cualidadesMatematicas(resultado) {
    const contenedorCualidades = document.getElementById("cualidadesMatematicas__lista");
    if (contenedorCualidades.innerHTML !== "") {
        contenedorCualidades.innerHTML = ""; // Limpiar la lista de cualidades matemáticas si ya tiene contenido
    }

    console.log("entraCualidadesMatematicas");

    if (resultado % 2 === 0) {
        generarElementoHijo(contenedorCualidades, "li", "El resultado es un número par.");
    } else {
        generarElementoHijo(contenedorCualidades, "li", "El resultado es un número impar.");
    }

    if (resultado > 0) {
        generarElementoHijo(contenedorCualidades, "li", "El resultado es un número positivo.");
    } else if (resultado < 0) {
        generarElementoHijo(contenedorCualidades, "li", "El resultado es un número negativo.");
    } else {
        generarElementoHijo(contenedorCualidades, "li", "El resultado es neutro, no tiene signo.");
    }

    if (resultado % 1 === 0) {
        generarElementoHijo(contenedorCualidades, "li", "El resultado es un número entero.");
    } else {
        generarElementoHijo(contenedorCualidades, "li", "El resultado es un número decimal.");
    }

    if (esPrimo(resultado)) {
        generarElementoHijo(contenedorCualidades, "li", "El resultado es un número primo.");
    } else {
        generarElementoHijo(contenedorCualidades, "li", "El resultado no es un número primo.");
    }
}

function esPrimo(n) {
    if (n <= 1 || n % 1 !== 0) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}


function limpiarResultados() {
    document.getElementById("resultadoMultiplicar").innerHTML = ""; // Limpiar resultados
    document.getElementById("tituloResultado").textContent = ""; // Limpiar título del resultado
    document.getElementById("btnLimpiar").style.display = "none"; // Ocultar el botón de limpiar
    document.getElementById("ContenedorresultadoMultiplicar").style.display = "none"; // Mostrar el contenedor de resultados

    }

function generarElementoHijo(padre, elementoCrear, contenido){
    const nuevoElemento = document.createElement(elementoCrear);
    nuevoElemento.textContent = contenido;
    padre.appendChild(nuevoElemento);
}

const btnMultiplicar = document.getElementById("btnMultiplicar");
btnMultiplicar.addEventListener("click", function () {
    console.log("click");
    const numero = parseFloat(document.getElementById("numeroMultiplicar").value);
    if (isNaN(numero)) {
        alert("Por favor, ingrese un número válido.");
        return;
    } else {
        // console.log("pasó");
        document.getElementById("resultadoMultiplicar").innerHTML = ""; // Limpiar resultados anteriores
        document.getElementById("ContenedorresultadoMultiplicar").style.display = "block"; // Mostrar el contenedor de resultados
        document.getElementById("numeroMultiplicar").value = ""; // Limpiar el campo de entrada
        document.getElementById("numeroMultiplicar").focus(); // Volver a enfocar el campo de entrada
        document.getElementById("tituloResultado").textContent = `Tabla de multiplicar del ${numero}`;
        document.getElementById("btnLimpiar").style.display = "block"; // Mostrar el título del resultado
        tablaMultiplicar(numero);
    }
});


// funcion de agregar nombres a la lista
// Obtener elementos del DOM
    const agregarBtn = document.getElementById("agregarBtn");
    const nombreInput = document.getElementById("nombreInput");
    const listaNombres = document.getElementById("listaNombres");
    const mensaje = document.getElementById("mensaje");

    // Agregar evento al botón al dar enter
nombreInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            agregar();
        }
    });


    function agregar() {
    const nombre = nombreInput.value.trim();

    if (nombre === "") {
        mensaje.textContent = "⚠️ Por favor, escribe un nombre.";
        return;
    }
    mensaje.textContent = "";

    // Crear elemento <li>
    const li = document.createElement("li");
    li.textContent = nombre;

    // Crear un <div> para contener los botones
    const div = document.createElement("div");
    div.classList.add("contenedorBotones");

    // Crear botón de eliminar
    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.classList.add("botonlista" , "eliminar");

        // Crear botón de editar
    const editarBtn = document.createElement("button");
    editarBtn.textContent = "Editar";
    editarBtn.classList.add("botonlista" , "editar");
    
    // Agregar funcionalidad para eliminar
    eliminarBtn.addEventListener("click", () => {
        eliminar(li);
    });

    // Agregar funcionalidad para editar
    editarBtn.addEventListener("click", () => {
        editar(li);
    });

    // agregar los botones al <div>
    div.appendChild(eliminarBtn);
    div.appendChild(editarBtn);

    // agregar el <div> al <li>
    li.appendChild(div);

    // Agregar <li> a la lista
    listaNombres.appendChild(li);

    // Limpiar el input
    nombreInput.value = "";
    nombreInput.focus();
}

function eliminar(li) {
    if (confirm("¿Estás seguro de que deseas eliminar este nombre?")) {
        li.remove();
    } else {
        alert("Operación cancelada");
    }
}

function editar(li) {
    const nuevoNombre = prompt("Introduce el nuevo nombre:", li.firstChild.textContent);
    if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
        li.firstChild.textContent = nuevoNombre;
    } else {
        alert("Operación cancelada");
    }
}