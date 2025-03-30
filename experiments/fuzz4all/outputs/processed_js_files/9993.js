 
(async () => {
    try {
         
        const _ = await import('https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js');
        
         
        const handler = {
            get(target, property) {
                print(`Property ${property.toString()} accessed`);
                return Reflect.get(...arguments);
            },
            set(target, property, value) {
                print(`Property ${property.toString()} set to ${value}`);
                return Reflect.set(...arguments);
            }
        };

        const proxyObject = new Proxy({ name: "AdvancedJS", year: 2023 }, handler);

         
        proxyObject.name = "ComplexJS";
        print(proxyObject.name);

         
        const data = [1, 2, 3, 4, 5];
        const sum = _.reduce(data, (total, n) => total + n, 0);
        print(`Sum of array: ${sum}`);
        
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();

 
class AdvancedFeatures {
    #privateField = 42;
    
    #privateMethod() {
        return `The answer is ${this.#privateField}`;
    }

    publicMethod() {
        return this.#privateMethod();
    }
}

const af = new AdvancedFeatures();
print(af.publicMethod());

 
function* generatorFunction() {
    yield 'Hello';
    yield 'Advanced';
    yield 'JavaScript';
}

const gen = generatorFunction();
for (const value of gen) {
    print(value);
}

 
const user = {
    name: 'Alice',
    preferences: {
        theme: null
    }
};

const theme = user.preferences?.theme ?? 'default';
print(`Theme: ${theme}`);

 
function tag(strings, ...values) {
    return strings.raw[0] + values.map((val, i) => `${val}${strings.raw[i + 1]}`).join('');