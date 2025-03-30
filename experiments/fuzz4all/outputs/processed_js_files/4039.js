 
async function fetchAndProcessData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
         
        const data = await response.json();
        const processedData = await Promise.all(
            data.map(async item => {
                 
                const { id, ...rest } = item;
                 
                const newItem = await new Promise(resolve => 
                    setTimeout(() => resolve({ id, processed: true, ...rest }), 100)
                );
                return newItem;
            })
        );

         
        return [...processedData];
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
const uniqueKey = Symbol('uniqueKey');

 
const dataHandler = {
    get: function(target, property) {
        print(`Getting ${property}`);
        return target[property];
    },
    set: function(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const data = new Proxy({ [uniqueKey]: 'secret' }, dataHandler);

 
(async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const result = await fetchAndProcessData(url);
    print('Processed Data:', result);

     
    print('Unique key value:', data[uniqueKey]);
    data.newProperty = 'This is a test';
    print('New Property:', data.newProperty);
})();
