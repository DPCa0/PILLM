 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();

         
        let { title, author, content } = data;

         
        return `Title: ${title}\nAuthor: ${author}\nContent: ${content.substring(0, 100)}...`;
    } catch (error) {
        return `Fetch error: ${error.message}`;
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Getting ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const dataProxy = new Proxy({}, handler);

 
async function main() {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const results = await Promise.all(urls.map(url => fetchData(url)));

    results.forEach((result, index) => {
        print(`Data from URL ${index + 1}:`);
        print(result);
    });

     
    dataProxy.name = 'JavaScript Enthusiast';
    print(dataProxy.name);
}

main();
