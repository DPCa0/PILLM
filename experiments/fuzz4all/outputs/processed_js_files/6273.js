class AsyncHandler {
    static async fetchData(url) {
        try {
            let response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Fetching data failed:', error);
            throw error;
        }
    }
}

function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const handlerProxy = new Proxy(AsyncHandler, {
    get(target, prop) {
        if (prop === 'fetchData') {
            return async function (...args) {
                print('Fetching data with args:', args);
                const result = await Reflect.apply(target[prop], target, args);
                print('Fetched data:', result);
                return result;
            };
        }
        return Reflect.get(target, prop);
    }
});

const iterator = idGenerator();
const currentId = iterator.next().value;

(async () => {
    try {
        const dataUrl = `https: 
        const data = await handlerProxy.fetchData(dataUrl);
        print('Post title:', data.title);
    } catch (error) {
        console.error('Error in async operation:', error);
    }
})();
