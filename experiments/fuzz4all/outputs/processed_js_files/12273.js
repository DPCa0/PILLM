 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject('URL not provided');
            }
        }, 1000);
    });
};

 
function* dataSequence() {
    try {
        const data1 = yield fetchData('https://api.example.com/data1');
        print(data1);
        const data2 = yield fetchData('https://api.example.com/data2');
        print(data2);
        const data3 = yield fetchData('https://api.example.com/data3');
        print(data3);
    } catch (err) {
        console.error(err);
    }
}

 
const runGenerator = (genFunc) => {
    const gen = genFunc();

    const iterate = ({ value, done }) => {
        if (done) return;
        return value.then(
            (result) => iterate(gen.next(result)),
            (err) => iterate(gen.throw(err))
        );
    };

    try {
        iterate(gen.next());
    } catch (err) {
        console.error(`Error: ${err}`);
    }
};

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property '${prop}'`);
            return target[prop];
        } else {
            console.error(`Property '${prop}' does not exist`);
        }
    },
};

const dataProxy = new Proxy({ a: 1, b: 2, c: 3 }, handler);

 
(async () => {
    print('Running generator:');
    runGenerator(dataSequence);

    print('\nUsing Proxy:');
    print(dataProxy.a);
    print(dataProxy.b);
    print(dataProxy.nonExistentProperty);
})();
