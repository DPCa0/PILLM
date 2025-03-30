(async () => {
     
    const handler = {
        get(target, property) {
            if (property in target) {
                print(`Getting property '${property}': ${target[property]}`);
                return target[property];
            }
            return `No such property: ${property}`;
        },
        set(target, property, value) {
            print(`Setting property '${property}' to '${value}'`);
            target[property] = value;
            return true;
        }
    };
    const reactiveObject = new Proxy({ name: 'Advanced JS' }, handler);

     
    function* idGenerator() {
        let id = 1;
        while (true) {
            yield id++;
        }
    }
    const generateId = idGenerator();

     
    const fetchData = async () => {
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        print("Fetching data...");
        await delay(1000);  
        return { data: 'Fetched Data', id: generateId.next().value };
    };

     
    const { data, id } = await fetchData();
    print(`Received ${data} with ID: ${id}`);
    
     
    reactiveObject.name = "Modern JavaScript";
    print(reactiveObject.name);
    print(reactiveObject.nonExistent);
})();
