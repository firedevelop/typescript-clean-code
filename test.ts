(() => { 
    abstract class Person{
        constructor(
            public name:string,
            public country:string
        ){}
        abstract showRole():void,
        welcome(){
            return `bienvenido, ${this.name} es de ${this.country}`;
        }
    }


    class Employee extends Person{
        constructor(
            name: string,
            country:string,
            public jobTitle: string
        ){
            super(name, country);
        }
        showRole(){
             .log()
        }
    }
 })()
 