 
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

 
const handler = {
    get(target, property) {
        print(`Property '${property}' was accessed.`);
        return Reflect.get(target, property);
    }
};

const targetObject = { name: 'JavaScript', type: 'Programming Language' };
const proxyObject = new Proxy(targetObject, handler);

 
function showInfo({ name, type, ...others }) {
    print(`Name: ${name}, Type: ${type}`);
    print('Additional Info:', others);
}

 
async function displayData(urls) {
    try {
        const dataPromises = urls.map(url => fetchData(url));
        const results = await Promise.all(dataPromises);
        results.forEach(data => print(data));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
print(proxyObject.name);

 
showInfo({ name: 'Node.js', type: 'Runtime Environment', version: '14.17.0', license: 'MIT' });

 
const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
displayData(urls);
