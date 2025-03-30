 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting property: ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const dataProxy = new Proxy({}, handler);

 
function* computeSquares(data) {
    for (const num of data) {
        yield num ** 2;
    }
}

 
(async () => {
    try {
        const data = await fetchData('https://api.publicapis.org/entries');
        dataProxy.entries = data.entries.slice(0, 5);  

        print('Entries:', dataProxy.entries);

         
        const squares = [...computeSquares(dataProxy.entries.map(entry => entry.Link.length))];
        print('Squares of Link lengths:', squares);

         
        dataProxy.entries.forEach(({ API, Description }) => {
            print(`API: ${API}, Description: ${Description?.substring(0, 50) ?? 'No description'}`);
        });

    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
})();
