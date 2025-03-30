 
const fetchData = async (url = 'https://jsonplaceholder.typicode.com/posts') => {
    try {
         
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
         
        const data = await response.json();
        const [{ id, title, body }] = data;
        
         
        print(formatOutput`Post ID: ${id}\nTitle: ${title}\nBody: ${body}`);
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

 
function formatOutput(strings, ...values) {
    return strings.reduce((result, string, i) => result + string + (values[i] || ''), '');
}

 
const handler = {
    get: (target, prop, receiver) => {
        if (prop in target) {
            return target[prop];
        } else {
            print(`Property ${prop} doesn't exist, returning default value.`);
            return 'Default value';
        }
    }
};

const proxyData = new Proxy({}, handler);

// Set some properties
proxyData.name = 'Example Proxy';

// Access a property that exists
print(proxyData.name); // Output: Example Proxy

// Access a property that doesn't exist
print(proxyData.nonExistent);  

 
fetchData();
