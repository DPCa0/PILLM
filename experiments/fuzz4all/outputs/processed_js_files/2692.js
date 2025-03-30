(async () => {
     
    const fetchJson = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

     
    const handler = {
        get: (target, prop) => {
            print(`Accessed property: ${prop}`);
            return Reflect.get(target, prop);
        }
    };

     
    const sampleObject = { a: 1, b: 2 };
    const proxiedObject = new Proxy(sampleObject, handler);

     
    function* numberGenerator() {
        let num = 0;
        while (true) {
            yield num++;
        }
    }

    const gen = numberGenerator();
    print(proxiedObject.a);  
    print(proxiedObject.b);  
    
    print(gen.next().value);  
    print(gen.next().value);  

     
    const dataUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    print('Fetching data...');
    await delay(2000);  
    const data = await fetchJson(dataUrl);
    print('Fetched data:', data);
})();
