class ReactiveValue {
    #value;
    #observers = new Set();
    
    constructor(initialValue) {
        this.#value = initialValue;
    }
    
    get value() {
        return this.#value;
    }
    
    set value(newValue) {
        if (newValue !== this.#value) {
            this.#value = newValue;
            this.#notify();
        }
    }
    
    subscribe(observer) {
        this.#observers.add(observer);
    }
    
    unsubscribe(observer) {
        this.#observers.delete(observer);
    }
    
    #notify() {
        this.#observers.forEach(observer => observer(this.#value));
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData(url) {
    await delay(1000);
    return { data: `Response from ${url}` };
}

async function* asyncGenerator(urls) {
    for (const url of urls) {
        yield fetchData(url);
    }
}

const urls = ["https://api.example.com/data1", "https://api.example.com/data2"];
const reactiveData = new ReactiveValue(null);

reactiveData.subscribe(data => print(`Data updated: ${data.data}`));

(async () => {
    for await (const response of asyncGenerator(urls)) {
        reactiveData.value = response;
    }
})();

const combineData = (dataArray) => ({
    combined: dataArray.map(data => data.data).join(" & "),
});

const arrayReactiveValues = urls.map(url => new ReactiveValue(null));
const combinedDataReactive = new ReactiveValue({ combined: "" });

arrayReactiveValues.forEach((reactiveValue, index) => {
    reactiveValue.subscribe(() => {
        const allData = arrayReactiveValues.map(rv => rv.value);
        if (allData.every(data => data !== null)) {
            combinedDataReactive.value = combineData(allData);
        }
    });
});

combinedDataReactive.subscribe(combinedData => print(`Combined data: ${combinedData.combined}`));

(async () => {
    for await (const response of asyncGenerator(urls)) {
        const reactiveValue = arrayReactiveValues[urls.indexOf(response.data.match(/Response from (.*)/)[1])];
        reactiveValue.value = response;
    }
})();
