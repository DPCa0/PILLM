 

 
async function fetchData(url) {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    return data;
}

 
function* asyncDataHandler(dataPromise) {
    try {
        const data = yield dataPromise;
        print('Data retrieved:', data);
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessed property: ${prop}`);
            return target[prop];
        } else {
            return `Property ${prop} not found`;
        }
    }
};

 
const exampleObj = {
    id: 1,
    name: 'Example'
};

const proxyObj = new Proxy(exampleObj, handler);

 
(async function() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';  
    const dataGenerator = asyncDataHandler(fetchData(url));
    
     
    const { value: dataPromise } = dataGenerator.next();
    
     
    try {
        const data = await dataPromise;
        dataGenerator.next(data);
    } catch (error) {
        dataGenerator.throw(error);
    }

     
    print(proxyObj.name);
    print(proxyObj.nonExistentProp);
})();
