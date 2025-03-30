const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

const processComplexData = (data) => {
    return data
        .filter(item => item.isActive)
        .map(item => ({
            ...item,
            fullName: `${item.firstName} ${item.lastName}`.toUpperCase(),
            score: item.scores.reduce((acc, score) => acc + score, 0)
        }))
        .sort((a, b) => b.score - a.score)
        .reduce((acc, { fullName, score }) => {
            acc[fullName] = score;
            return acc;
        }, {});
};

(async () => {
    const url = 'https://api.example.com/data';
    const rawData = await fetchData(url);
    const processedData = processComplexData(rawData);
    console.table(processedData);
})();

 
const targetObject = {
    name: "Advanced JavaScript",
    year: 2023,
};

const handler = {
    get: (target, prop, receiver) => {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const proxy = new Proxy(targetObject, handler);

proxy.name;           
proxy.year = 2024;    
proxy.year;           
