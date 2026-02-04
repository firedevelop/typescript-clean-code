
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

```typescript
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

```typescript
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

