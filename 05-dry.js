"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    name;
    price;
    size;
    constructor(name = '', price = 0, size = '') {
        this.name = name;
        this.price = price;
        this.size = size;
    }
    isProductReady() {
        for (const key in this) {
            switch (typeof this[key]) {
                case 'string':
                    if (this[key].length <= 0)
                        throw Error(`${key} is empty`);
                    break;
                case 'number':
                    if (this[key] <= 0)
                        throw Error(`${key} is zero`);
                    break;
                default:
                    throw Error(`${typeof this[key]} is not valid`);
            }
        }
        return true;
    }
    toString() {
        if (!this.isProductReady)
            return;
        return `${this.name} (${this.price}), ${this.size}`;
    }
}
(() => {
    const bluePants = new Product('Blue Pants', 10, 'S');
    console.log(bluePants.toString());
})();
//# sourceMappingURL=05-dry.js.map