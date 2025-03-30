 
function logExecution(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        print(`Calling ${propertyKey} with`, args);
        const result = originalMethod.apply(this, args);
        print(`Returned from ${propertyKey}:`, result);
        return result;
    };
    return descriptor;
}

 
const handler = {
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        if (target.onChange) target.onChange(property, value);
        return true;
    }
};

 
class AdvancedCalculator {
    constructor() {
        this.properties = new Proxy({}, handler);
    }

    @logExecution
    add(a, b) {
        return a + b;
    }

    @logExecution
    async fetchData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

 
(async () => {
    const calculator = new AdvancedCalculator();
    calculator.properties.onChange = (property, value) => {
        print(`Property ${property} changed to ${value}`);
    };

    calculator.properties.dynamic = 'initial';
    calculator.properties.dynamic = 'changed';

    const sum = calculator.add(5, 7);
    print('Sum:', sum);

    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const data = await calculator.fetchData(url);
    print('Fetched Data:', data);
})();
