 

const apiHandler = {
    get: function(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            print(`Property "${prop}" does not exist.`);
            return null;
        }
    },
    set: function(target, prop, value) {
        print(`Setting property "${prop}" to "${value}"`);
        target[prop] = value;
        return true;
    }
};

const apiProxy = new Proxy({}, apiHandler);

async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok.');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function processApiData(url) {
    try {
        let data = await fetchData(url);
        apiProxy.data = data;
        print('Data retrieved:', apiProxy.data);
        return data;
    } catch (error) {
        console.error('Processing error:', error);
    }
}

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
processApiData(apiUrl).then(data => {
    if (data) {
        print('Operation successful:', data.length, 'items retrieved.');
    } else {
        print('No data processed.');
    }
});
