 
function templateProcessor(strings, ...values) {
    return strings.reduce((result, string, i) => {
        let value = values[i - 1];
        if (typeof value === "function") {
            value = value();
        }
        return result + (i ? value : "") + string;
    });
}

 
const handler = {
    get(target, prop) {
        if (prop === "greet") {
            return `Hello, ${target.name}!`;
        }
        return Reflect.get(target, prop);
    }
};

const user = new Proxy({ name: "Alice" }, handler);

 
const privates = new WeakMap();
const privateMethod = Symbol("privateMethod");

class ComplexClass {
    constructor() {
        privates.set(this, {
            [privateMethod]: () => "This is private"
        });
    }

    publicMethod() {
        return privates.get(this)[privateMethod]();
    }
}

 
async function asyncFunction() {
    const complex = new ComplexClass();
    return new Promise((resolve) => {
        setTimeout(() => resolve(complex.publicMethod()), 1000);
    });
}

(async () => {
     
    const [first, ...rest] = [1, 2, 3, 4, 5];
    
    print(templateProcessor`First: ${first}, Rest: ${rest}`);
    
    print(user.greet);

    const result = await asyncFunction();
    print(result);
})();
