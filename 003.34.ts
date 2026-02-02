// añadir maximo de tipados
function sumar( a:number, b:number ):number{
  return a + b;
}
let total:(a:number, b:number)=>number;
total = sumar;
console.log(total(2,3))

//
const contar = ( heroes:string[] ):number => {
  return heroes.length;
}
const superHeroes:string[] = ["Flash", "Arrow", "Superman", "Linterna Verde"];
contar(superHeroes);


//Parametros por defecto
const llamarBatman = ( llamar:boolean ):void => {
  if( llamar ){
    console.log("Batiseñal activada");
  }
}

llamarBatman(true);

// Rest?
const unirheroes = ( personas ) => {
  return personas.join(", ");
}


// Tipo funcion
const noHaceNada = ( numero, texto, booleano, arreglo ):=> {}

// Crear el tipo de funcion que acepte la funcion "noHaceNada"
let noHaceNadaTampoco;
noHaceNadaTampoco = noHaceNada
