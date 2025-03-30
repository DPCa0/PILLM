 
const fetchDataAndProcess = async (url) => {
    try {
         
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

         
        const uniqueValues = new Set(data.map(item => item.value));
        const valueCounts = new Map();

        uniqueValues.forEach(value => {
            valueCounts.set(
                value,
                data.filter(item => item.value === value).length
            );
        });

         
        const handler = {
            get: function(target, prop) {
                print(`Accessing property '${prop}' with value: ${target[prop]}`);
                return Reflect.get(...arguments);
            }
        };

        const proxy = new Proxy(valueCounts, handler);

         
        for (const [key, count] of proxy) {
            print(`Value: ${key}, Count: ${count}`);
        }

    } catch (error) {
        console.error('Error:', error);
    }
};

 
fetchDataAndProcess('https://api.example.com/data');
