 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

 
const handler = {
    set: function(obj, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

 
class Example {
    #privateField = 'I am private';

    constructor(value) {
        this.proxyObject = new Proxy({}, handler);
        this.publicField = value;
    }

    #privateMethod() {
        return this.#privateField;
    }

    getPrivateData() {
        return this.#privateMethod();
    }
}

 
(async () => {
    try {
         
        const [data1, data2] = await Promise.all([
            fetchData('https://api.example.com/data1'),
            fetchData('https://api.example.com/data2')
        ]);

         
        const { name: name1 } = data1;
        const { name: name2 } = data2;

         
        const tag = (strs, ...values) => {
            return strs.reduce((acc, str, i) => `${acc}${str}<strong>${values[i] || ''}</strong>`, '');
        };
        
        print(tag`Fetched data: ${name1} and ${name2}`);

         
        const exampleInstance = new Example('Hello World');
        exampleInstance.proxyObject.property = 'Example Value';
        
        print('Public field:', exampleInstance.publicField);
        print('Private data:', exampleInstance.getPrivateData());

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
