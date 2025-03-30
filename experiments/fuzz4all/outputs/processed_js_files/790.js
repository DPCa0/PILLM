 

 
const fetchData = async (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
};

 
function* urlGenerator() {
    yield 'https://api.example.com/data1';
    yield 'https://api.example.com/data2';
    yield 'https://api.example.com/data3';
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Accessing ${prop}`);
            return Reflect.get(target, prop, receiver);
        } else {
            print(`Property ${prop} does not exist`);
            return undefined;
        }
    }
};

 
const dataObject = new Proxy({}, handler);

 
const main = async () => {
    const generator = urlGenerator();
    for (const url of generator) {
        const data = await fetchData(url);
        dataObject[url] = data;
    }

     
    print(dataObject['https://api.example.com/data1']);  
    print(dataObject['https://api.example.com/data4']);  
};

 
main();
