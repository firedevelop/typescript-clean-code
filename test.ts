type Hero = {
    name: string;
    age?: number;
    powers: number[];
    getName?: ()=>string;
}

let flash: Hero={
    name: 'j',
    age: 30,
    powers:[1,2],
    getName():{return this.name}
}

let superman: Hero={
    name: 'm',
    powers:[1],
    getName():{return this.name}
}


