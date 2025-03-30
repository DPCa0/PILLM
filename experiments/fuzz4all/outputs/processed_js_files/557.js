 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) {  
                resolve({ data: "Hello, world!", status: 200 });
            } else {
                reject(new Error("Failed to fetch data"));
            }
        }, 1000);
    });
}

 
function* processData(url) {
    try {
        const response = yield fetchData(url);
        const { data, status } = response;
        if (status === 200) {
            return `Processed Data: ${data}`;
        } else {
            return 'Error: Invalid status';
        }
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

 
async function run(generator, ...args) {
    const iterator = generator(...args);

    function handleNext(iteratorResult) {
        if (iteratorResult.done) return Promise.resolve(iteratorResult.value);

        return Promise.resolve(iteratorResult.value)
            .then(res => handleNext(iterator.next(res)))
            .catch(err => handleNext(iterator.throw(err)));
    }

    try {
        return await handleNext(iterator.next());
    } catch (error) {
        return error.message;
    }
}

 
(async () => {
    const result = await run(processData, 'https://api.example.com/data');
    print(result);  
})();
