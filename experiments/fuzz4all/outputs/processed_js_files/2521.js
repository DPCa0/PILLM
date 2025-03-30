 
async function* fetchData(urls) {
    for (const url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

 
function urlBuilder(strings, ...values) {
    return strings.reduce((acc, str, i) => `${acc}${str}${values[i] || ''}`, '');
}

 
const loggingHandler = {
    get(target, property) {
        print(`Getting ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const data = new Proxy({}, loggingHandler);

 
(async () => {
    const urls = [
        urlBuilder`https: 
        urlBuilder`https: 
    ];
    for await (const result of fetchData(urls)) {
        print(result);
        data[result.id] = result;
    }
    
     
    const { id, ...otherData } = data[1];
    print(`Data for ID ${id}:`, otherData);
})();
