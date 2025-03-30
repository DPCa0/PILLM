 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: { user: { id: 1, name: 'John Doe', location: 'Earth' } } });
        }, 1000);
    });
};

 
function* dataFlow() {
    const response = yield fetchData();
    return response;
}

 
async function executeGenerator(gen) {
    const iter = gen();
    let result = iter.next();

    while (!result.done) {
         
        result = iter.next(await result.value);
    }

     
    const { data: { user: { id, name, location } } } = result.value;
    print(`ID: ${id}, Name: ${name}, Location: ${location}`);
}

 
executeGenerator(dataFlow);

 
const promises = [
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another Success')
];

Promise.allSettled(promises).then(results => {
    results.forEach(({ status, value, reason }) => {
        print(`Status: ${status}, Value/Reason: ${value || reason}`);
    });
});
