 
(async () => {
    try {
         
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

         
        const [first, second] = ['Hello', 'World'];

         
        const uniqueGreetings = new Set([`${first}, ${second}!`, `${first.toLowerCase()}, ${second.toLowerCase()}!`]);

         
        for await (const greeting of uniqueGreetings) {
            await delay(500);  
            print(greeting);
        }

         
        const target = { count: 0 };
        const handler = {
            get: (obj, prop) => {
                print(`Getting the property '${prop}'`);
                return prop in obj ? obj[prop] : 'Not found';
            },
            set: (obj, prop, value) => {
                print(`Setting the property '${prop}' to ${value}`);
                obj[prop] = value;
                return true;
            }
        };

        const reactiveObject = new Proxy(target, handler);
        reactiveObject.count = 42;   
        print(reactiveObject.count);   

         
        function* numberGenerator() {
            let num = 1;
            while (num <= 5) {
                yield num++;
            }
        }

        for (const number of numberGenerator()) {
            print(number);
        }

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
