 

 
function fetchData(endpoint) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) {
                resolve({ data: `Data from ${endpoint}` });
            } else {
                reject('Fetch error!');
            }
        }, 1000);
    });
}

 
function* endpointGenerator() {
    yield 'endpoint1';
    yield 'endpoint2';
    yield 'endpoint3';
}

 
async function getData(generator) {
    for (const endpoint of generator) {
        try {
            const { data } = await fetchData(endpoint);
            print(data);
        } catch (error) {
            console.error(error);
        }
    }
}

 
const settings = new Proxy(
    { theme: 'dark', notifications: true },
    {
        get(target, prop) {
            print(`Accessing setting: ${prop}`);
            return target[prop];
        },
        set(target, prop, value) {
            print(`Changing setting: ${prop} to ${value}`);
            target[prop] = value;
            return true;
        }
    }
);

 
print(`Current theme: ${settings.theme}`);
settings.theme = 'light';

 
const endpoints = endpointGenerator();
getData(endpoints);

