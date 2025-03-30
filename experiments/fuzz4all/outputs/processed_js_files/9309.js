 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: "Hello, World!" });
        }, 1000);
    });
};

 
const transformData = (fn) => (data) => {
    const transformed = fn(data);
    print("Transformed Data:", transformed);
    return transformed;
};

 
const logAccess = (obj) => {
    return new Proxy(obj, {
        get(target, prop) {
            print(`Accessing property '${prop}'`);
            return target[prop];
        },
    });
};

 
function* generateItems(collection) {
    for (const item of collection) {
        yield item;
    }
}

 
(async () => {
    const data = await fetchData();
    const loggedData = logAccess(data);

    const upperCaseTransformer = transformData((data) => data.toUpperCase());
    upperCaseTransformer(loggedData.data);

    const items = ['apple', 'banana', 'cherry'];
    const itemGenerator = generateItems(items);
    for (const item of itemGenerator) {
        print('Generated Item:', item);
    }
})();
