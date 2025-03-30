(async () => {
     
    const fetchData = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    };

     
    const dynamicObject = new Proxy({}, {
        get(target, property) {
            if (property in target) {
                print(`Getting value of ${property}`);
                return target[property];
            }
            console.warn(`Property ${property} does not exist`);
            return undefined;
        },
        set(target, property, value) {
            print(`Setting value of ${property} to ${value}`);
            target[property] = value;
            return true;
        }
    });

     
    const uniqueItems = new Set(['apple', 'banana', 'orange']);
    const itemsMap = new Map();
    uniqueItems.forEach((item, index) => itemsMap.set(index, item));

     
    const processItems = ({ set, map } = { set: new Set(), map: new Map() }) => {
        set.forEach(item => print(`Processing set item: ${item}`));
        for (const [key, value] of map.entries()) {
            print(`Processing map item: key=${key}, value=${value}`);
        }
    };

     
    const outputMessage = `Set has ${uniqueItems.size} unique items. Processing...`;

    try {
        print(outputMessage);
        dynamicObject.someProp = 'Hello Proxy!';
        print(dynamicObject.someProp);
        print(dynamicObject.nonExistentProp);
        
        await fetchData('https://jsonplaceholder.typicode.com/todos/1')
            .then(data => print('Fetched Data:', data));

        processItems({ set: uniqueItems, map: itemsMap });
    } catch (error) {
        console.error('Error encountered:', error);
    }
})();
