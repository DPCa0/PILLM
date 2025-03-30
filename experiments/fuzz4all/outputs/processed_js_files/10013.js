 
(async () => {
     
    const fetchData = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {message: "Hello, World!"};
            Math.random() > 0.5 ? resolve(data) : reject('Fetch error!');
        }, 1000);
    });

     
    const handler = {
        get(target, prop) {
            print(`Accessed property "${prop}"`);
            return target[prop];
        }
    };

    try {
         
        const result = await fetchData();
        const proxyResult = new Proxy(result, handler);

         
        print(proxyResult.message);
    } catch (error) {
        console.error(error);
    }

     
    function* fibonacci(limit) {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < limit; i++) {
            [prev, curr] = [curr, prev + curr];
            yield prev;
        }
    }

     
    for (let num of fibonacci(5)) {
        print(num);
    }
})();
