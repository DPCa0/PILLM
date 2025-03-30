 

 
async function fetchData(url) {
     
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
async function* asyncGenerator(array) {
    for (let item of array) {
        yield fetchData(item);  
    }
}

 
const dataHandler = {
    get: (target, prop) => {
        print(`Getting property: ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
function processData({ id, name, value }) {
    print(`ID: ${id}, Name: ${name}, Value: ${value}`);
}

 
const dataArray = ['https://api.example.com/data1', 'https://api.example.com/data2'];

 
async function main() {
     
    const dataProxy = new Proxy({}, dataHandler);

     
    for await (let dataPromise of asyncGenerator(dataArray)) {
        let data = await dataPromise;
        if (data) {
            processData(data);
            dataProxy[data.id] = data;  
        }
    }

     
    print(dataProxy[1]);
}

 
main();
