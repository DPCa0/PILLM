 

 
const fetchData = (url) => new Promise((resolve, reject) => {
    print(`Fetching data from ${url}...`);
    setTimeout(() => {
        Math.random() > 0.2 ? resolve({ data: 'Sample Data from ' + url }) : reject('Fetch error');
    }, 1000);
});

 
const getDataFromAPIs = async () => {
    try {
        const [result1, result2] = await Promise.all([
            fetchData('https://api.example.com/data1'),
            fetchData('https://api.example.com/data2')
        ]);
        print('Result 1:', result1.data);
        print('Result 2:', result2.data);
    } catch (error) {
        console.error('Error:', error);
    }
};

 
const logHandler = {
    get: (target, prop) => {
        print(`Accessed property: ${prop}`);
        return prop in target ? target[prop] : `Property ${prop} not found`;
    }
};

const dataObject = new Proxy({ name: 'JavaScript', type: 'Programming Language' }, logHandler);

 
getDataFromAPIs();

 
print(dataObject.name);
print(dataObject.version);   
