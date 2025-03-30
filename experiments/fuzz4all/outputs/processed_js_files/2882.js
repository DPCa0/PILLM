class ComplexObject {
    #privateVar = 'Private Data';
    constructor(name) {
        this.name = name;
    }

    async fetchData() {
        const data = await fetch('https://api.example.com/data');
        return data.json();
    }

    *generatorFunction() {
        let id = 0;
        while (true) {
            yield { id: id++, value: Math.random() };
        }
    }

    static processItems(items) {
        return items.map(item => ({
            ...item,
            processed: true,
        }));
    }

    getPrivateData() {
        return this.#privateVar;
    }
}

(async () => {
    const instance = new ComplexObject('Demo');
    
    print(`Created object: ${instance.name}`);

    print(`Accessing private data: ${instance.getPrivateData()}`);

     
    const gen = instance.generatorFunction();
    print('Generator output:', gen.next().value);
    print('Generator output:', gen.next().value);

     
    try {
        const data = await instance.fetchData();
        print('Fetched data:', data);

         
        const processedData = ComplexObject.processItems(data);
        print('Processed Data:', processedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
