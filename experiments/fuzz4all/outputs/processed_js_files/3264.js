 
async function fetchData(url) {
     
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
}

const dataHandler = {
    get: function(target, prop) {
        if (prop in target) {
            print(`Accessing property ${prop}`);
            return target[prop];
        } else {
            throw new ReferenceError(`Property ${prop} does not exist.`);
        }
    },
    set: function(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const data = new Proxy({}, dataHandler);

(async function() {
    try {
        const apiData = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        data.title = apiData.title;   
        print(data.title);      
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
})();
