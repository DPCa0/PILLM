 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetching error:', error);
    }
};

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Getting value of ${prop}`);
            return target[prop];
        } else {
            console.error(`Property ${prop} does not exist`);
        }
    },
    set(target, prop, value) {
        print(`Setting value of ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const state = new Proxy({}, handler);

 
const manipulateData = ({ results: [...rest] }, ...additions) => {
    print(`Initial Data: ${JSON.stringify(rest)}`);
    const mergedData = [...rest, ...additions];
    print(`Merged Data: ${JSON.stringify(mergedData)}`);
    return mergedData;
};

 
(async () => {
    const data = await fetchData('https://api.example.com/data');
    if (data) {
        const result = manipulateData(data, { id: 5, name: 'Item5' }, { id: 6, name: 'Item6' });
        result.forEach((item, index) => {
            state[`item${index}`] = item;
        });
        print(state.item0);
        print(state.nonExistent);   
    }
})();
