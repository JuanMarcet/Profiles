function tablaMultiplicar(numero) {
    const padre = document.getElementById("resultadoMultiplicar");

    for (let i = 1; i <= 12; i++) {
        const resultado = parseFloat((numero * i).toFixed(2)); // to fixed(2) para limitar a 2 decimales
        generarElementoHijo(padre, "li", `${numero} x ${i} = ${resultado}`);
        console.log(`${numero} x ${i} = ${resultado}`);
    }
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
        tablaMultiplicar(numero);
    }
});
