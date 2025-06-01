function tablaMultiplicar(numero) {
    const padre = document.getElementById("resultadoMultiplicar");

    for (let i = 0; i <= 12; i++) {
        const resultado = parseFloat((numero * i).toFixed(2)); // to fixed(2) para limitar a 2 decimales
        generarElementoHijo(padre, "li", `${numero} x ${i} = ${resultado}`);
        console.log(`${numero} x ${i} = ${resultado}`);
    }
}

function calculosMatematcios(){
    const numero1 = parseFloat(document.getElementById("numero1").value); // Obtener el primer número
    const numero2 = parseFloat(document.getElementById("numero2").value); // Obtener el segundo número
    const OP = document.getElementById("operaciones").value; // Obtener la operación seleccionada
    let resultado;
        // asgegurarse que los campos sean numeros
    if (isNaN(numero1) || isNaN(numero2)) {
        alert("Por favor, ingrese números válidos.");
        return;
    }
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
    document.getElementById("resultadoOP").textContent = resultado;
}

function limpiarResultados() {
    document.getElementById("resultadoMultiplicar").innerHTML = ""; // Limpiar resultados
    document.getElementById("tituloResultado").textContent = ""; // Limpiar título del resultado
    document.getElementById("btnLimpiar").style.display = "none"; // Ocultar el botón de limpiar
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
        document.getElementById("numeroMultiplicar").value = ""; // Limpiar el campo de entrada
        document.getElementById("numeroMultiplicar").focus(); // Volver a enfocar el campo de entrada
        document.getElementById("tituloResultado").textContent = `Tabla de multiplicar del ${numero}`;
        document.getElementById("btnLimpiar").style.display = "block"; // Mostrar el título del resultado
        tablaMultiplicar(numero);
    }
});
