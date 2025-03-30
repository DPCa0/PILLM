const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
};

const processData = async () => {
    try {
        const data = await fetchData('https://api.example.com/data');
        const processed = data.map(({ id, value }) => ({ id, transformedValue: value * 2 }));
        
        return processed.reduce((acc, cur) => {
            acc.total += cur.transformedValue;
            return acc;
        }, { total: 0 });
    } catch (error) {
        console.error(`Error processing data: ${error.message}`);
    }
};

const printData = async () => {
    const result = await processData();
    if (result) {
        print(`Total transformed value: ${result.total}`);
    }
};

const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

const handleResize = debounce(() => {
    print('Resize event handled, performing heavy operations...');
     
    setTimeout(() => print('Heavy operation done.'), 1000);
}, 500);

window.addEventListener('resize', handleResize);

 
printData();
