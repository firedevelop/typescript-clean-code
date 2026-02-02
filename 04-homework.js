"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(() => {
    // Resolver sin la triple condicional dentro del if
    // includes? arrays?
    function isRedFruit(fruit) {
        const redFruits = ['manzana', 'cereza', 'ciruela'];
        return redFruits.includes(fruit);
    }
    function getFruitsByColor(color) {
        const fruitsByColor = {
            red: ['manzana', 'fresa'],
            yellow: ['piña', 'banana'],
            purple: ['moras', 'uvas'],
        };
        if (!Object.keys(fruitsByColor).includes(color)) {
            throw Error('the color must be: red, yellow, purple');
        }
        return fruitsByColor[color];
        // switch( color ) {
        //     case 'red':
        //         return ['manzana','fresa'];
        //     case 'yellow':
        //         return ['piña','banana'];
        //     case 'purple':
        //         return ['moras','uvas'];
        //     default:
        //         throw Error('the color must be: red, yellow, purple');
        // }
    }
    // Simplificar esta función
    let isFirstStepWorking = true;
    let isSecondStepWorking = true;
    let isThirdStepWorking = true;
    let isFourthStepWorking = false;
    function workingSteps() {
        if (!isFirstStepWorking)
            return 'First step broken.';
        if (!isSecondStepWorking)
            return 'Second step broken.';
        if (!isThirdStepWorking)
            return 'Third step broken.';
        if (!isFourthStepWorking)
            return 'Fourth step broken.';
        return 'Working properly!';
    }
    // isRedFruit
    console.log({ isRedFruit: isRedFruit('cereza'), fruit: 'cereza' }); // true
    console.log({ isRedFruit: isRedFruit('piña'), fruit: 'piña' }); // true
    //getFruitsByColor
    console.log({ redFruits: getFruitsByColor('red') }); // ['manzana', 'fresa']
    console.log({ yellowFruits: getFruitsByColor('yellow') }); // ['piña', 'banana']
    console.log({ purpleFruits: getFruitsByColor('purple') }); // ['moras', 'uvas']
    // console.log({ pinkFruits: getFruitsByColor('pink') }); // Error: the color must be: red, yellow, purple
    // workingSteps
    console.log({ workingSteps: workingSteps() }); // Cambiar los valores de la línea 31 y esperar los resultados
})();
//# sourceMappingURL=04-homework.js.map