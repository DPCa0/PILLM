 
async function fetchDataAndProcess(url) {
    try {
         
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
         
        let data = await response.json();

         
        let dataProxy = new Proxy(data, {
            get(target, prop) {
                print(`Accessing property "${prop}"`);
                return target[prop];
            }
        });

         
        let uniqueItems = new Set(dataProxy.items.map(item => item.name));
        let itemMap = new Map(dataProxy.items.map(item => [item.name, item.value]));

         
        function* itemGenerator(items) {
            for (let item of items) {
                yield item;
            }
        }

         
        async function logItems(generator) {
            for await (let item of generator) {
                print(`Processing item: ${item} with value: ${itemMap.get(item)}`);
            }
        }

         
        await logItems(itemGenerator(uniqueItems));

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

 
fetchDataAndProcess('https://api.example.com/data');
