 

class API {
    constructor(data) {
        this.data = data;
    }

    fetchData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.data);
            }, 1000);
        });
    }
}

const handler = {
    get(target, prop, receiver) {
        if (prop === 'fetchData') {
            return async function () {
                print('Fetching data...');
                let result = await Reflect.apply(target[prop], target, []);
                print('Data fetched:', result);
                return result;
            };
        }
        return Reflect.get(target, prop, receiver);
    }
};

const myAPI = new Proxy(new API({ message: 'Hello, world!' }), handler);

(async () => {
    const data = await myAPI.fetchData();
    print('Processed data:', data.message.toUpperCase());
})();
