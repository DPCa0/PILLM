(async () => {
    const fetchData = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    };

    const processData = (data) => {
        return data.map(item => ({
            ...item,
            uppercaseName: item.name.toUpperCase(),
            idSquared: item.id ** 2,
        }));
    };

    const compute = (numbers) => {
        const set = new Set(numbers);
        const filtered = [...set].filter(num => num % 2 === 0);
        return filtered.reduce((acc, num) => acc + num, 0);
    };

    try {
        const rawData = await fetchData('https://jsonplaceholder.typicode.com/users');
        const processedData = processData(rawData);

        print('Processed Data:', processedData);

        const numbers = processedData.map(user => user.idSquared);
        const computedResult = compute(numbers);

        print('Computed Result:', computedResult);
    } catch (error) {
        console.error('Error:', error);
    }

     
    const reactiveHandler = {
        set: (obj, prop, value) => {
            print(`Property ${prop} set to ${value}`);
            obj[prop] = value;
            return true;
        }
    };

    const reactiveData = new Proxy({ count: 0 }, reactiveHandler);

     
    reactiveData.count = 5;
    reactiveData.count = 10;
})();
