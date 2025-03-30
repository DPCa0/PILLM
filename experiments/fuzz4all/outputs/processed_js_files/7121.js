 

async function complexOperation(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.valid) {
                resolve(`Processed data: ${data.info}`);
            } else {
                reject('Invalid data');
            }
        }, 1000);
    });
}

function closureExample() {
    let count = 0;
    return function() {
        return ++count;
    };
}

(async () => {
    const data = { valid: true, info: { name: 'JavaScript', version: 'ES6+' } };

     
    const { info: { name, version } } = data;
    const newData = { ...data, extra: 'Additional Info' };

    try {
        const result = await complexOperation(newData);
        print(`${result} - Info: ${name} ${version}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }

     
    const counter = closureExample();
    print(`Counter: ${counter()}`);
    print(`Counter: ${counter()}`);
})();
