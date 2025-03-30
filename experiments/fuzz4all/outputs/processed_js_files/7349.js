 

 
function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

 
async function fetchData() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: [1, 2, 3, 4, 5] });
        }, 1000);
    });
    return await promise;
}

 
(async () => {
    try {
        const { data } = await fetchData();

         
        const [first, second, ...rest] = data;

        print(`First: ${first}, Second: ${second}, Rest: ${rest}`);

         
        const generator = numberGenerator();
        print(generator.next().value);  
        print(generator.next().value);  

         
        const squaredData = data.map(num => num ** 2);
        print(`Squared data: ${squaredData}`);

    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
