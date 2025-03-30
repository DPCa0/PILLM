 

 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (;;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function fetchData(num) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Fetched data for ${num}`);
        }, 1000);
    });
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Accessing property '${prop}'`);
        return Reflect.get(target, prop, receiver);
    }
};

 
const dataHandler = new Proxy({ fetchedData: [] }, handler);

 
(async () => {
    const fibGen = fibonacci();
    for (let i = 0; i < 5; i++) {
        const num = fibGen.next().value;
        print(`Fibonacci: ${num}`);

         
        const data = await fetchData(num);
        dataHandler.fetchedData.push(data);   
    }

     
    print('Results:', dataHandler.fetchedData);
})();
