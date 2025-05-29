function arreglo(lista, fruta){
    lista.push(fruta);
}

let frutas = ["manzana", "pera", "naranja"];
console.log(frutas);
arreglo(frutas, "uva"); // llamda correccta a la funcion
console.log(frutas); // ["manzana", "pera", "naranja", "uva"]