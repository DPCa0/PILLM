 
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

 
async function processUserData() {
    try {
        const userData = await fetchData('https://jsonplaceholder.typicode.com/users');
        
         
        const processedData = userData.map(({ id, name, email, address: { city, geo: { lat, lng } } }) => ({
            id,
            name,
            contact: `${name} <${email}>`,
            location: `${city} (Lat: ${lat}, Lng: ${lng})`
        }));

         
        const summary = processedData.reduce((acc, { location }) => {
            acc[location] = (acc[location] || 0) + 1;
            return acc;
        }, {});

        print('User Data Processed:', processedData);
        print('Location Summary:', summary);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const handler = {
    get: (target, prop) => {
        if (typeof target[prop] === 'function') {
            return function (...args) {
                print(`Calling method ${prop} with arguments:`, args);
                return target[prop].apply(this, args);
            };
        } else {
            return target[prop];
        }
    }
};

const loggedConsole = new Proxy(console, handler);

 
(async () => {
    loggedConsole.log('Starting User Data Processing');
    await processUserData();
    loggedConsole.log('Finished Processing User Data');
})();
