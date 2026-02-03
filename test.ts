(()=>{
    type Hero={
        name:string;
        age?:number;
        powers: number[];
        getName?:()=>string;
    }
    
    let myCustomVariable: (string | number | Hero)='John';
    console.log(typeof myCustomVariable);   //string

    myCustomVariable = 20;
    console.log(typeof myCustomVariable);  //number 

    myCustomVariable = {
        name: 'j',
        age:20,
        powers: [1,2],
    }
})()