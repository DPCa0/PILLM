 
const fetchData = async () => {
    const data = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ success: true, value: 42 });
        }, 2000);
    });
    return data;
};

 
function* processData() {
    const raw = yield fetchData();
    if (raw.success) {
        return raw.value * 2;
    } else {
        throw new Error('Failed to fetch data');
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property "${prop}"`);
        return target[prop];
    }
};
const targetObject = { a: 1, b: 2, c: 3 };
const proxy = new Proxy(targetObject, handler);

 
(async () => {
    try {
        const iterator = processData();
        const { value: promise } = iterator.next();
        const data = await promise;
        const { value: result } = iterator.next(data);
        print(`Processed result: ${result}`);
    } catch (error) {
        console.error(error);
    }

     
    print(proxy.a);  
    print(proxy.b);  
})();
