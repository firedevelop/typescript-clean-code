# Icons
👉👈👇👆✅❌🚧⬅️⬆️➡️⬇️
# Clean Code y deuda técnica
Principio de Responsabilidad única:
cada tarea hace una cosa y la hace bien.

Transpilar: traducir el codigo de ts a js.

Compilar: pasar código a binario y que la maquina lo ejecute.


## 4. Refactorización de condicionales (04-homework.ts)

### 4.1. Triple condicional dentro del if

**EJERCICIO:** Triple condicional dentro del `if`.  
**SOLUCIÓN:** Usar una estructura de datos (Set o Array) para almacenar las frutas rojas y verificar pertenencia.

**Código original:**

```javascript
// Resolver sin la triple condicional dentro del if
// includes? arrays?
function isRedFruit( fruit: string ): boolean {

    if ( fruit === 'manzana' || fruit === 'cereza' || fruit === 'ciruela' ) {
        return true;
    } else {
        return false;
    }
}
```

**Código refactorizado:**

```javascript
const RED_FRUITS = new Set(['manzana', 'cereza', 'ciruela']);

function isRedFruit(fruit: string): boolean {
    return RED_FRUITS.has(fruit);
}
```

**Ventajas:**

- Elimina la lógica repetitiva.
- Centraliza la lista de frutas rojas, facilitando mantenimiento.
- Mejora la legibilidad.

### 4.2. Múltiples `if-else` para mapear colores

**EJERCICIO:** Múltiples `if-else` para mapear colores.  
**SOLUCIÓN:** Utilizar un objeto literal como mapa de colores a frutas.

**Código original:**

```javascript
// Simplificar esta función
// switch? Object literal? validar posibles colores
function getFruitsByColor( color: string ): string[] {

    if ( color === 'red' ) {
        return ['manzana','fresa'];
    } else if ( color === 'yellow') {
        return ['piña','banana'];
    } else if ( color === 'purple') {
        return ['moras','uvas']
    } else {
        throw Error('the color must be: red, yellow, purple');
    }
}
```

**Código refactorizado (objeto literal):**

```javascript
const FRUITS_BY_COLOR: Record<string, string[]> = {
    red: ['manzana', 'fresa'],
    yellow: ['piña', 'banana'],
    purple: ['moras', 'uvas']
};

function getFruitsByColor(color: string): string[] {
    if (!Object.keys(FRUITS_BY_COLOR).includes(color)) {
        throw Error('the color must be: red, yellow, purple');
    }
    return FRUITS_BY_COLOR[color];
}
```

**Alternativa con `switch`** (menos recomendada):

```javascript
function getFruitsByColor(color: string): string[] {
    switch (color) {
        case 'red': return ['manzana', 'fresa'];
        case 'yellow': return ['piña', 'banana'];
        case 'purple': return ['moras', 'uvas'];
        default: throw Error('the color must be: red, yellow, purple');
    }
}
```

**Ventajas:**

- Elimina anidación.
- Datos separados de la lógica.
- Fácil añadir nuevos colores.

### 4.3. Nested `if` statements (arrow‑head anti‑pattern)

**EJERCICIO:** Nested `if` statements (arrow‑head anti‑pattern).  
**SOLUCIÓN:** Usar early returns para aplanar la lógica.

**Código original:**

```javascript
// Simplificar esta función
let isFirstStepWorking = true;
let isSecondStepWorking = true;
let isThirdStepWorking = true;
let isFourthStepWorking = true;

function workingSteps() {
  if (isFirstStepWorking === true) {
    if (isSecondStepWorking === true) {
      if (isThirdStepWorking === true) {
        if (isFourthStepWorking === true) {
          return "Working properly!";
        } else {
          return "Fourth step broken.";
        }
      } else {
        return "Third step broken.";
      }
    } else {
      return "Second step broken.";
    }
  } else {
    return "First step broken.";
  }
}
```

**Código refactorizado:**

```javascript
let isFirstStepWorking = true;
let isSecondStepWorking = true;
let isThirdStepWorking = true;
let isFourthStepWorking = true;

function workingSteps(): string {
    if (!isFirstStepWorking) return 'First step broken.';
    if (!isSecondStepWorking) return 'Second step broken.';
    if (!isThirdStepWorking) return 'Third step broken.';
    if (!isFourthStepWorking) return 'Fourth step broken.';
    return 'Working properly!';
}
```


**Ventajas:**

- Reduce complejidad ciclomática.
- Cada condición se evalúa de forma independiente.
- Más fácil de depurar y modificar.

---

## Verificación de las soluciones

Puedes ejecutar el archivo `test.js` adjunto para verificar el comportamiento de los ejercicios de condicionales:

```bash
node test.js
```

Este archivo contiene las implementaciones refactorizadas y pruebas que demuestran que las funciones producen los mismos resultados que las originales.

## Principios de Clean Code aplicados

- **DRY (Don't Repeat Yourself):** Evitar la repetición de lógica (como la lista de frutas rojas o validaciones duplicadas).
- **Single Responsibility:** Cada función tiene una única responsabilidad.
- **Readability:** Código más legible y expresivo.
- **Maintainability:** Centralizar datos en estructuras separadas facilita cambios futuros.
- **Fail Fast:** Validación temprana de entradas incorrectas (ej. color no válido).
- **Meaningful Names:** Uso de nombres que revelan intención.
- **Explicit Types:** Tipado explícito para mayor seguridad y claridad.


# 5. Clases y el principio de la Responsabilidad única
### 5.1 Objetos como propiedades
```
(() => {

    // No aplicando el principio de responsabilidad única

    type Gender = 'M'|'F';

    class Person {
        constructor(
            public name: string, 
            public gender: Gender, 
            public birthdate: Date
        ){}
    }


    class User extends Person {
        
        public lastAccess: Date;

        constructor(
            public email: string,
            public role: string,
            name: string,
            gender: Gender,
            birthdate: Date,
        ) {
            super( name, gender, birthdate );
            this.lastAccess = new Date();
        }

        checkCredentials() {
            return true;
        }
    }


    class UserSettings extends User {
        constructor(
            public workingDirectory: string,
            public lastOpenFolder  : string,
            email                  : string,
            role                   : string,
            name                   : string,
            gender                 : Gender,
            birthdate              : Date
        ) {
            super(email, role, name, gender, birthdate );
        }
    }


    const userSettings = new UserSettings(
        '/usr/home',
        '/home',
        'fernando@google.com',
        'Admin',
        'Fernando',
        'M',
        new Date('1985-10-21')
    );

    console.log({ userSettings });


})();
```

### 5.2 

```
(() => {

    // No aplicando el principio de responsabilidad única

    type Gender = 'M'|'F';

    interface PersonProps {
        birthdate : Date;
        gender    : Gender;
        name      : string;
    }

    class Person {
        public birthdate: Date;
        public gender   : Gender;
        public name     : string;

        constructor({ name, gender, birthdate }: PersonProps ){
            this.name      = name;
            this.gender    = gender;
            this.birthdate = birthdate;
        }
    }


    interface UserProps {
        birthdate : Date;
        email     : string;
        gender    : Gender;
        name      : string;
        role      : string;
    }

    class User extends Person {
        
        public email: string;
        public role : string;
        public lastAccess: Date;

        constructor({
            birthdate,
            email,
            gender,
            name,
            role,
        }: UserProps ) {
            super({ name, gender, birthdate });
            this.lastAccess = new Date();
            this.email = email;
            this.role  = role;
        }

        checkCredentials() {
            return true;
        }
    }


    interface UserSettingsProps {
        birthdate        : Date;
        email            : string;
        gender           : Gender;
        lastOpenFolder   : string;
        name             : string;
        role             : string;
        workingDirectory : string;
    }

    class UserSettings extends User {

        public workingDirectory: string;
        public lastOpenFolder  : string;

        constructor({
            workingDirectory,
            lastOpenFolder,
            email,
            role,
            name,
            gender,
            birthdate,
        }: UserSettingsProps ) {
            super({ email, role, name, gender, birthdate });
            this.workingDirectory = workingDirectory;
            this.lastOpenFolder   = lastOpenFolder;
        }
    }


    const userSettings = new UserSettings({
        birthdate: new Date('1985-10-21'),
        email: 'fernando@google.com',
        gender: 'M',
        lastOpenFolder: '/home',
        name: 'Fernando',
        role: 'Admin',
        workingDirectory: '/usr/home',
    });

    console.log({ userSettings });


})();
```

### 5.3 Aplicando el principio de responsabilidad única. Priorizar la composición frente a la herencia!

```
(() => {

    type Gender = 'M'|'F';

    interface PersonProps {
        birthdate : Date;
        gender    : Gender;
        name      : string;
    }

    class Person {
        public birthdate: Date;
        public gender   : Gender;
        public name     : string;

        constructor({ name, gender, birthdate }: PersonProps ){
            this.name      = name;
            this.gender    = gender;
            this.birthdate = birthdate;
        }
    }


    interface UserProps {
        email     : string;
        role      : string;
    }

    class User {
        
        public email      : string;
        public lastAccess : Date;
        public role       : string;

        constructor({
            email,
            role,
        }: UserProps ) {
            this.lastAccess = new Date();
            this.email = email;
            this.role  = role;
        }

        checkCredentials() {
            return true;
        }
    }


    interface SettingsProps {
        lastOpenFolder   : string;
        workingDirectory : string;
    }

    class Settings {

        public workingDirectory: string;
        public lastOpenFolder  : string;

        constructor({
            lastOpenFolder,
            workingDirectory,
        }: SettingsProps ) {
            this.lastOpenFolder   = lastOpenFolder;
            this.workingDirectory = workingDirectory;
        }
    }


    interface UserSettingsProps {
        birthdate        : Date;
        email            : string;
        gender           : Gender;
        lastOpenFolder   : string;
        name             : string;
        role             : string;
        workingDirectory : string;
    }

    class UserSettings {

        public person  : Person;
        public user    : User;
        public settings: Settings;

        constructor({
            name, gender, birthdate,
            email, role,
            lastOpenFolder, workingDirectory,
        }: UserSettingsProps ){

            this.person = new Person({ name, gender, birthdate });
            this.user = new User({ email, role });
            this.settings = new Settings({ lastOpenFolder, workingDirectory })
        }
    }



    const userSettings = new UserSettings({
        birthdate: new Date('1985-10-21'),
        email: 'fernando@google.com',
        gender: 'M',
        lastOpenFolder: '/home',
        name: 'Fernando',
        role: 'Admin',
        workingDirectory: '/usr/home',
    });

    console.log({ userSettings });

    
})();
```

# 6. Clases. Estructura recomendada
```ts
class HtmlElement {

    // Comenzar con lista de propiedades.
    
    // 1. Propiedades estáticas.
    public static domReady: boolean = false;

    // 2. Propiedades públicas de último (aunque en el ejemplo se muestran privadas).
    private _id: string;
    private type: string;
    private updatedAt: number;

    // Métodos

    // 1. Empezando por los constructores estáticos.
    static createInput( id: string ) {
        return new HtmlElement(id, 'input');
    }

    // 2. Luego el constructor.
    constructor( id: string, type: string ) {
        this._id = id;
        this.type = type;
        this.updatedAt = Date.now();
    }

    // 3. Seguidamente métodos estáticos.
    // 4. Métodos privados después.
    
    // 5. Resto de métodos de instancia ordenados de mayor a menor importancia.
    setType( type: string ) {
        this.type = type;
        this.updatedAt = Date.now();
    }

    // 6. Getters y Setters al final.
    get id(): string {
        return this._id;
    }
}
```

# 7. STUPID - Code Smells

# 8. Principios SOLID
Cada principio básicamente cuenta de 3 partes, una exposición, un ejercicio y cómo detectar violaciones al principio, algunos son bastante obvios y otros tienen un poco más de complejidad, pero no dejen que los nombres los asusten, son fáciles de comprender con la práctica.


Los 5 principios S.O.L.I.D. de diseño de software son:


    S – Single Responsibility Principle (SRP)

    O – Open/Closed Principle (OCP)

    L – Liskov Substitution Principle (LSP)

    I – Interface Segregation Principle (ISP)

    D – Dependency Inversion Principle (DIP)

Y en esta sección hablaremos sobre cada uno de ellos.


# 0. TypeScript - tipos basicos
## Commands
```ts
tsc --init

tsc -w  //watching (muestra los archivos traspilados para si quieres comparar ts con js)
```
## Conceptos
en typescript los : significan el tipo de dato, ej de tipo numerico:
const a : 10

# 3. ¿Qué son los tipos de datos
* Primitivos
    * String
    * Number
    * Boolean
    * Especiales
    * Symbol
* Compuestos
    * Objetos literales
    * Funciones
    * Clases
    * Arreglos
* TypeScript permite:
    * crear nuevos tipos
    * Interfaces
    * Genericos
    * Tuplas

Especiales:
    age = null
    hero = undefined

### Symbols
cuando se necesita dentro de un objeto garantizar que una propiedad sea unica. (dos symbols apuntan a un espacio de memoria diferente)

### Objetos literales
```ts
person = {
    name: 'John',
    age: 35
}
```

Función Anónima AutoInvocada:
esta tecnica se usa para hacer funciones autoinvocadas y así tener codigo encapsulado para hacer pruebas:
```ts
(()=> {

})
```


## 3.14. Inferir tipos y modo estricto
b da error puede volver asignarse pero esta tipado a string unicamente.
```
const a:number = 10;
let b:string;

b = 3.14;
b = {};
b = [];
b = true;
```

funciones autoinvocadas:
```ts
(()=> {
    const a:number = 10;
    console.log(a)
})()
```

Ventaja de ts: obseva como esto da error en ts pues num1 es undefind, sin embargo si usamos js da output 'es mayor'
```ts
 let num1;
 let num2: number = 10;
 
 if(num1 < num2){
    console.log('es menor')
 } else{
    console.log('es mayor)
 }
```

 tipos de String (se recomienda usar '')
 ```ts
const a: string = 'john';
const b: string = "mery";
const c: string = `peter`;
 ```

uso de ? 
(si hay algo en posicion 10, en caso contrario no hace nada)
```ts
const a: string = 'john';
console.log(a[10].toUpperCase()) 
// ERROR 
console.log(a[10]?.toUpperCase());
// undefined
console.log(a[10]?.toUpperCase() || 'missing');
// missing 
```

## 3.18 tipo any (evitar usarlo)
Nunca lo usen pues para eso usamos ts en lugar de js para tener un tipado stricto.
```ts
(()=>{
    let a:any = 123;
    a = 'john';
    console.log(a.charAt(0))
    // j
    a = 1.5
})
```

any puede ser cualquier tipo, véase como cambia de string a number
```ts
let a:any = 123;
a = 'some text';
console.log(a.chartAt(0)); // s
a = 1.5
console.log(a)
```

casting de tipo AS y de tipo <> (para hacer una excepción de tipo de en lugar de ser any lo trata como string o number y con esto se logra que al poner el punto salgan los métodos en visual studio, de otra manera no salen pues es 'any')
```ts
let a:any = 123
a = 'some text';
console.log(a as string).charAt(0) // s
a = 1.56890;
console.log(<number>a).toFixed(2); // 1.56
```


# 3.19 Arrays 
[ ] significa arreglos, tambien pueden ser tuplas.

array que admite múltiples tipos
```ts
const a: (string | number | boolean)[] = [1, 2, 3, '4',true];
a.push(true)
console.log(a) 
// 1,2,3,4,true,true

``` 

## 3.20 Tuples
```ts
const a: [string, number,boolean] = ['some text',100,true];
hero[0]='text'     //ok
hero[0]=50        //error
hero[1]=50       //ok
hero[1]='text'  //error
hero[2]=true   //ok
hero[2]=50    //error

```

## 3.21. Enum
```ts
(()=>{
    enum Level{
        min = 1,
        medium,
        medium2,
        max = 10,
    }
    
    console.log(Level.min);       //1
    console.log(Level.medium);   //2
    console.log(Level.max);     //10

    let volume: Level = Level.medium2;
    console.log(volume);      // 3
    
})()
```
example:
```ts
    (()=>{
    enum level{
        min = 0,
        medium = 50,
        max = 100
    }
    const jazz:level = level.min;
    const pop:level = level.medium;
    const rock:level = level.max;
    })()
```

## 3.22 Void, null, undefined

¿son lo mismo? **Rotundamente NO.** Son tres conceptos diferentes.

Aunque los tres representan la idea de "nada" o "vacío", se usan en contextos muy distintos. Confundirlos es la causa número 1 de bugs en aplicaciones JavaScript/TypeScript.

Aquí tienes la explicación definitiva con una analogía fácil de entender.

---

### 1. `undefined` (No inicializado) 🤷‍♂️

**"Existe, pero nadie le ha dado valor todavía".**

Es el valor por defecto que JavaScript/TypeScript asigna a las cosas que has declarado pero no has rellenado.

* **Significado:** "Todavía no sé qué es esto".
* **¿Quién lo pone?** Generalmente el **Sistema** (automáticamente), aunque tú puedes asignarlo manualmente (no recomendado).

```typescript
let usuario: string; 
console.log(usuario); // ➡️ undefined
// (La variable existe, pero la caja está vacía porque nadie metió nada)

```

### 2. `null` (Intencionalmente vacío) 📭

**"Existe, y le he puesto un valor 'vacío' a propósito".**

Se usa cuando quieres decir explícitamente que **no hay dato**. Es útil para limpiar variables o resetear formularios.

* **Significado:** "Sé que aquí no hay nada, porque yo lo he decidido".
* **¿Quién lo pone?** El **Programador**.

```typescript
let usuario: string | null;

// El usuario se loguea
usuario = "Carlos";

// El usuario hace logout (Lo vaciamos a propósito)
usuario = null; 

```

### 3. `void` (Vacío / Sin retorno) 🕳️

**"Esto es una acción, no un valor".**

`void` es exclusivo de TypeScript y se usa casi siempre en **funciones**. Indica que la función hace un trabajo (como guardar en base de datos o mostrar una alerta) pero **no devuelve ningún dato** útil para que lo recojas en una variable.

* **Significado:** "No esperes recibir nada de mí".
* **Uso:** Tipado de funciones.

```typescript
// ✅ Correcto: La función hace algo, pero no devuelve nada (return)
function mostrarAlerta(): void {
    alert("Hola!");
}

// ❌ Error lógico: Intentar guardar el resultado de una función void
const resultado = mostrarAlerta(); // ¿Qué guardas aquí? Nada.

```

---

### Resumen para tu "Cheat Sheet" mental 🧠

| Concepto | Tipo | Significado Humano | Ejemplo de la vida real |
| --- | --- | --- | --- |
| **undefined** | Valor y Tipo | "Se me olvidó rellenarlo" | Una caja de Amazon que te llega sin abrir. |
| **null** | Valor | "Lo dejé en blanco aposta" | Una casilla de formulario que dice "Opcional". |
| **void** | Solo Tipo | "No devuelve nada" | Gritar "¡Hola!" al aire (haces la acción, pero no te llevas nada físico a casa). |

### ¿Cuándo usar cuál?

1. **¿Variable sin valor inicial?** Deja que sea `undefined`.
2. **¿Resetear un campo o decir "sin selección"?** Usa `null`.
3. **¿Definir una función que no tiene `return`?** Usa `void`.

## 3.23 Never
es una funcion que usualmente va a terminar con un error.
```ts
const error =(message:string):never=>{
    throw new Error(message);
}
error('failed!');
```

## 3.24 StrictNullChecks
Pongan typescript lo mas reestrictivo, no empiecen a cambiar el archivo
un valor boolean tsconfig.json ¿para qué sino estan ustedes usando ts?

# 4. Funciones y objetos
Puntualmente tenemos:
    Declaraciones básicas de funciones
    Parámetros obligatorios
    Parámetros opcionales
    Parámetros por defecto
    Parámetros REST
    Tipo de datos "Function"



## 4.29 Funciones Parámetros
veamos 2 cosas:
1.tipado con multiples parámetros (véase lastName)
2. El tipado no quiere decir que sea infalible, fíjate en noName, ts no da error pues se le pasa un string.
```diff
(()=>{
//                                                             👇
+     const fullName = (firstName:string, lastName:(string | boolean))=>{
        return `${firstName} ${lastName}`;
})
const name = fullName('John',true);
console.log({name});

let noName:string;
const name2 = fullName(noName, 'Smith');
console.log({name})
```

## 4.30 parametros por defecto y opcionales
Aquí tienes el código exacto que aparece en la imagen transcrito para que puedas copiarlo y pegarlo:
### Puntos clave de este código:

0. **`): string =>`** es lo que hace que TypeScript sea "seguro". Se llama Tipo de Retorno (Return Type).
1. **`lastName?: string`**: El signo de interrogación indica que el parámetro es **opcional**.
2. **`upper: boolean = false`**: Establece un **valor por defecto**; si no envías ese argumento, será `false`.
3. **`|| '----'`**: Es un operador lógico que sirve de *fallback*. Si `lastName` no existe (es undefined), usará los guiones.
```typescript
(() => {
//                                               👇                   👇
    const fullName = ( firstName: string, lastName?: string, upper: boolean = false ): string => {

        if ( upper ) {
            // CASO 1: Se ejecuta si 'upper' es true
            return `${ firstName } ${ lastName || '----' }`.toUpperCase();
        } else {
            // CASO 2: Se ejecuta si 'upper' es false o no se envía nada
            return `${ firstName } ${ lastName || '----' }`;
        }

    }

    // --- PRUEBA DEL CASO 1 (El de la imagen) ---
//                                           👇
    const name = fullName( 'Tony', 'Stark', true );
    
    console.log({ name }); 
    // 📢 Output: { name: 'TONY STARK' }


    // --- PRUEBA DEL CASO 2 (Si no enviamos el 3er argumento) ---
    const nameNormal = fullName( 'Tony', 'Stark' );
    
    console.log({ nameNormal });
    // 📢 Output: { nameNormal: 'Tony Stark' }

})()
```

Parámetros REST
```typescript
(()=>{
    const fullName = (firstName: string, ...restArgs:string[]):string=>{
        return `${firstName} ${restArgs.join('')}`
    }
    const superman = fullName('john', 'mery','steve');
    console.log({superman})
})()
```

## 4.34 Tipo Function
En lugar de dejar let myFunction; (que es any y un peligro), vamos a definir la firma exacta que debe tener la variable para aceptar cada función.
```typescript
(() => {

    // --- FUNCIONES ORIGINALES ---
    const addNumbers = ( a: number, b: number ) => a + b;
    const greet = ( name: string ) => `Hola ${ name }`;
    const saveTheWorld = () => `El mundo está salvado!`;


    // ---------------------------------------------------------
    // CASO 1: Tipado para aceptar 'addNumbers'
    // ---------------------------------------------------------
    // "Esta variable SOLO acepta funciones que reciban 2 números y devuelvan un número"
    let myFunctionNumbers: (y: number, x: number) => number;

    myFunctionNumbers = addNumbers; 
    console.log( myFunctionNumbers(10, 20) ); // ✅ Correcto: 30
    
    // myFunctionNumbers = greet; // ❌ ERROR: 'greet' no devuelve un número ni recibe 2 argumentos.


    // ---------------------------------------------------------
    // CASO 2: Tipado para aceptar 'greet'
    // ---------------------------------------------------------
    // "Esta variable SOLO acepta funciones que reciban 1 string y devuelvan un string"
    let myFunctionString: (name: string) => string;

    myFunctionString = greet;
    console.log( myFunctionString('Manuel') ); // ✅ Correcto: Hola Manuel

    // myFunctionString( 1, 2 ); // ❌ ERROR: TypeScript te avisa AQUÍ (no al ejecutar) de que los argumentos están mal.


    // ---------------------------------------------------------
    // CASO 3: Tipado para aceptar 'saveTheWorld'
    // ---------------------------------------------------------
    // "Esta variable SOLO acepta funciones sin argumentos que devuelvan un string"
    let myFunctionVoid: () => string;

    myFunctionVoid = saveTheWorld;
    console.log( myFunctionVoid() ); // ✅ Correcto

})();

```

Casos de maximo tipado:
```typescript
// 1. Añadir máximo de tipados
// -------------------------------------------------
function sumar( a: number, b: number ): number {
    return a + b;
}

// Aquí definimos la firma completa de la variable
let total: ( a: number, b: number ) => number;

total = sumar;
console.log( total(2, 3) );



// 2. Tipado de Arrays y retorno
// -------------------------------------------------
const contar = ( heroes: string[] ): number => {
    return heroes.length;
}

const superHeroes: string[] = ["Flash", "Arrow", "Superman", "Linterna Verde"];
contar( superHeroes );



// 3. Parámetros por defecto (Default params)
// -------------------------------------------------
// Hemos añadido "= true" para que sea un valor por defecto real
const llamarBatman = ( llamar: boolean = true ): void => {
    if( llamar ){
        console.log("Batiseñal activada");
    }
}

llamarBatman(); // Ahora funciona sin argumentos (usa true por defecto)



// 4. Rest Parameters (El operador ...)
// -------------------------------------------------
// El rest operator junta todos los argumentos en un array de strings
const unirheroes = ( ...personas: string[] ): string => {
    return personas.join(", ");
}

// Se usa enviando argumentos sueltos:
console.log( unirheroes("Thor", "Ironman", "Spiderman") );



// 5. Tipo función complejo (Tu ejercicio final)
// -------------------------------------------------

// Primero arreglamos la función original (tenía errores de sintaxis)
const noHaceNada = ( numero: number, texto: string, booleano: boolean, arreglo: string[] ): void => {
    // No hace nada
}

// AHORA EL RETO: Crear el tipo de variable que acepte esa función
let noHaceNadaTampoco: ( n: number, t: string, b: boolean, a: string[] ) => void;

// Asignación correcta
noHaceNadaTampoco = noHaceNada;
```

# 5. Objetos y tipos personalizados en TypeScript
    Objetos básicos
    Crear objetos con tipos específicos
    Crear métodos dentro de objetos
    Tipos personalizados
    Crear variables que soporten varios tipos a la vez.
    Comprobar el tipo de un objeto.