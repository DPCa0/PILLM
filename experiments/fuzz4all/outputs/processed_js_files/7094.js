 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
    print(`Fetching data from ${url}...`);
    await delay(1000);  
    return { data: 'Sample Data', source: url };
}

 
const handler = {
    get: function(target, prop) {
        print(`Getting ${prop}`);
        return prop in target ? target[prop] : 'Property does not exist';
    },
    set: function(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
(async function main() {
    try {
        const data1 = await fetchData('https://api.example.com/data1');
        const data2 = await fetchData('https://api.example.com/data2');

        const dataStore = new Proxy({}, handler);
        dataStore['data1'] = data1.data;
        dataStore['data2'] = data2.data;

        print('Data from dataStore:', dataStore['data1'], dataStore['data2']);
        print('Accessing non-existent property:', dataStore['data3']);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
