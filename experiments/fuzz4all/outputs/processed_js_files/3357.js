const fetchData = async (url) => {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Fetching error:", error);
    }
};

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    filterData(criteria) {
        return this.data.filter(item => 
            Object.keys(criteria).every(key => item[key] === criteria[key])
        );
    }

    transformData(callback) {
        return this.data.map(callback);
    }
}

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const rawData = await fetchData(url);

    const processor = new DataProcessor(rawData);

    const filteredData = processor.filterData({ userId: 1 });
    const transformedData = processor.transformData(item => ({
        title: item.title.toUpperCase(),
        body: item.body.toLowerCase(),
    }));

    const uniqueTitles = new Set(transformedData.map(item => item.title));
    const result = [...uniqueTitles];

    print("Unique Transformed Titles:", result);

    const observer = new Proxy(transformedData, {
        get(target, property) {
            print(`Accessing ${property} property`);
            return target[property];
        },
        set(target, property, value) {
            print(`Setting ${property} property to ${value}`);
            target[property] = value;
            return true;
        }
    });

    print("Observed Data:", observer[0]);
})();
