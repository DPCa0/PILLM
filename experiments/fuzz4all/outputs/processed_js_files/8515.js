 
const complexOperation = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const num = Math.floor(Math.random() * 10);
            num > 2 ? resolve(num) : reject('Number too low');
        }, 1000);
    });
};

 
(async function executeComplexOperation() {
    try {
         
        const target = { value: 42 };
        const handler = {
            get: (obj, prop) => {
                print(`Accessing property "${prop}"`);
                return obj[prop];
            }
        };
        const proxy = new Proxy(target, handler);
        print(`Proxy value: ${proxy.value}`);

         
        const [first, second = 'Default'] = [await complexOperation()];
        print(`Received numbers: ${first}, ${second}`);

         
        const customParser = (strings, ...values) => {
            return strings.reduce((result, str, i) => {
                return `${result}${str}<${values[i] || ''}>`;
            }, '');
        };
        print(customParser`Parsed number: ${first}`);
    } catch (error) {
        console.error(`Error occurred: ${error}`);
    }
})();
