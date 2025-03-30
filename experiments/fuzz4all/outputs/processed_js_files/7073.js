 
async function fetchAndProcessData(url) {
    try {
         
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
         
        const data = await response.json();

         
        const { title, description, ...rest } = data;

         
        const summary = `
        Title: ${title}
        Description: ${description}
        Other Data: ${JSON.stringify(rest, null, 2)}
        `;

         
        print(formatOutput(summary));
        
    } catch (error) {
         
        console.error('Failed to fetch or process data:', error);
    }
}

 
function formatOutput(strings, ...values) {
     
    return strings.reduce((result, str, i) => {
        return `${result}${str.toUpperCase()}${values[i] ? values[i] : ''}`;
    }, '');
}

 
fetchAndProcessData('https://jsonplaceholder.typicode.com/posts/1');

 
const target = { message: 'Hello, Proxy!' };
const handler = {
    get: (obj, prop) => {
        print(`Getting the ${prop} property`);
        return prop in obj ? obj[prop] : `Property ${prop} doesn't exist`;
    },
    set: (obj, prop, value) => {
        print(`Setting ${prop} property to ${value}`);
        obj[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);
print(proxy.message); // Access the existing property
proxy.newProp = 'Testing Proxy!';  
print(proxy.nonExistentProp);  
