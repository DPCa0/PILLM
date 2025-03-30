 
async function fetchAndProcessData(url) {
    try {
         
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

         
        let data = await response.json();

         
        let { id, title } = data;
        
         
        let message = `ID: ${id}, Title: ${title}`;
        
         
        logFormatted`Data Fetched: ${message}`;

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

 
function logFormatted(strings, message) {
    print(`[${new Date().toLocaleTimeString()}] ${strings[0]} ${message}`);
}

 
const urlValidator = new Proxy(fetchAndProcessData, {
    apply: function(target, thisArg, argumentsList) {
        if (typeof argumentsList[0] !== 'string' || !argumentsList[0].startsWith('http')) {
            throw new Error('Invalid URL');
        }
        return target.apply(thisArg, argumentsList);
    }
});

 
urlValidator('https://jsonplaceholder.typicode.com/posts/1');
