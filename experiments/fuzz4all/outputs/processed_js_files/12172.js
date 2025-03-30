 

 
function fetchDataFromAPI(apiEndpoint) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {  
                resolve(`Data from ${apiEndpoint}`);
            } else {
                reject('API Error: Failed to fetch data');
            }
        }, 1000);
    });
}

async function handleAPICall(apiEndpoint) {
    try {
        const data = await fetchDataFromAPI(apiEndpoint);
        print(data);
    } catch (error) {
        console.error(error);
    }
}

 
const apiHandler = {
    get: function(target, property) {
        return function(...args) {
            print(`API call to: ${property}`);
            return target[property](...args);
        };
    }
};

const apiProxy = new Proxy({ handleAPICall }, apiHandler);

 
function* infiniteSequence(start = 0) {
    let i = start;
    while (true) {
        yield i++;
    }
}

 
const sequenceHandler = {
    get: function(target, property) {
        if (property === 'next') {
            print('Generating next number in sequence');
        }
        return target[property].bind(target);
    }
};

const numberSequence = new Proxy(infiniteSequence(), sequenceHandler);

 
apiProxy.handleAPICall('https://example.com/data');
const iterator = numberSequence;

print(iterator.next().value);  
print(iterator.next().value);  
print(iterator.next().value);  
