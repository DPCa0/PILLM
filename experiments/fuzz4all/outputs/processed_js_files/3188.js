 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             
            if (url === 'https://api.example.com/data') {
                resolve({ data: [1, 2, 3, 4, 5] });
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
}

 
const arrayHandler = {
    get(target, property) {
        if (typeof target[property] === 'function') {
            return (...args) => {
                print(`Array method called: ${property}`);
                return target[property](...args);
            }
        } else {
            return target[property];
        }
    }
};

 
function* valueGenerator(array) {
    for (const value of array) {
        yield value;
    }
}

(async function() {
    try {
         
        const response = await fetchData('https://api.example.com/data');
        print('Fetched data:', response.data);

         
        const proxiedArray = new Proxy(response.data, arrayHandler);

         
        const generator = valueGenerator(proxiedArray);
        
        for (const value of generator) {
            print(`Generated value: ${value}`);
        }
        
         
        proxiedArray.push(6);
        proxiedArray.pop();

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
