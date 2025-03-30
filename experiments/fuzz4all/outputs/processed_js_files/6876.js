const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const processData = (data) => {
    return data
        .map(({ id, name, value }) => ({ id, name, squaredValue: value ** 2 }))
        .filter(item => item.squaredValue > 10)
        .reduce((acc, item) => {
            acc.names.push(item.name);
            acc.totalValue += item.squaredValue;
            return acc;
        }, { names: [], totalValue: 0 });
};

(async () => {
    try {
        const dataUrl = 'https://api.example.com/data';
        const rawData = await fetchData(dataUrl);
        
        const worker = new Worker(URL.createObjectURL(new Blob([`
            onmessage = function(e) {
                const { processData } = e.data;
                postMessage(processData(e.data.rawData));
            }
        `], { type: 'application/javascript' })));
        
        worker.onmessage = function(e) {
            print('Processed Data:', e.data);
            worker.terminate();
        };

        worker.postMessage({ processData, rawData });

        const iterableObj = {
            *[Symbol.iterator]() {
                let i = 0;
                while (i < 5) yield i++;
            }
        };
        
        const result = Array.from(iterableObj).map(num => num * num);
        print('Squared Numbers:', result);
        
    } catch (error) {
        console.error('Error:', error);
    }
})();
