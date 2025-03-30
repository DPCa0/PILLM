 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function* fetchDataAsync() {
    const data = ['apple', 'banana', 'cherry'];
    for (const item of data) {
        await delay(1000);  
        yield `Fetched: ${item}`;
    }
}

 
const handler = {
    get(target, property) {
        if (property === 'greeting') {
            return () => 'Hello from a Proxy!';
        }
        return Reflect.get(target, property);
    }
};

 
const dynamicObject = new Proxy({}, handler);

 
(async function main() {
    print(dynamicObject.greeting());  

     
    const uniqueKey = Symbol('unique');
    const obj = {
        [uniqueKey]: 'This is a unique value'
    };
    print(obj[uniqueKey]);  

     
    for await (const data of fetchDataAsync()) {
        print(data);
    }

     
    const asyncFunctions = [
        async () => 'Result 1',
        async () => 'Result 2',
        async () => 'Result 3'
    ];
    const results = await Promise.all(asyncFunctions.map(fn => fn()));
    print(results);

     
    const { a, ...rest } = { a: 1, b: 2, c: 3 };
    print(a);  
    print(rest);  

     
    const greet = (name = 'World') => `Hello, ${name}!`;
    print(greet('JavaScript'));
    print(greet());
})();
