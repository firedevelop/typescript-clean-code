(() => {

    // Tipos
    const batman:string = 'Bruce';
    const superman:string = 'Clark';
  
    const existe:boolean = false;
  
    // Tuplas
    const parejaHeroes:[string, string] = [batman,superman];
    const villano:[string, number, boolean] = ['Lex Lutor',5,true];
  
    // Arreglos
    const aliados:(string)[] = ['Mujer Maravilla','Acuaman','San', 'Flash'];
  
    //Enumeraciones
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


  
    // Retorno de funciones
    function activar_batiseñal():string{
      return 'activada';
    }
  
    function pedir_ayuda():void{
      console.log('Auxilio!!!');
    }
  
    // Aserciones de Tipo
    const poder: any = '100';
    const largoDelPoder:number = (poder as string).length;
    console.log( largoDelPoder );
  
  
  })()
  
  