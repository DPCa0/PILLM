 

 
function* infiniteSeries(start = 0) {
    let i = start;
    while (true) {
        yield i++;
    }
}

 
const seriesHandler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            throw new Error(`Property ${prop} does not exist.`);
        }
    }
};

 
const series = new Proxy({ nextValue: infiniteSeries() }, seriesHandler);

 
async function fetchSeriesValue() {
    return new Promise((resolve) => {
        setTimeout(() => {
             
            resolve(series.nextValue.next().value);
        }, 1000);
    });
}

 
(async () => {
    try {
        print("Fetching series value...");
        const value = await fetchSeriesValue();
        print(`Fetched value: ${value}`);
    } catch (error) {
        console.error(error);
    }
})();
