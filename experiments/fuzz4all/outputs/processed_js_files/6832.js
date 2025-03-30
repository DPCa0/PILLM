 

class API {
    constructor() {
        this.data = [
            { id: 1, name: 'Alice', active: true },
            { id: 2, name: 'Bob', active: false },
            { id: 3, name: 'Charlie', active: true },
        ];
    }
    fetchData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.data), 1000);
        });
    }
}

async function fetchAndProcessData(api) {
    try {
        let data = await api.fetchData();
        let proxy = new Proxy(data, {
            get(target, prop) {
                if (prop === 'activeUsers') {
                    return target.filter(user => user.active);
                }
                return target[prop];
            },
            set(target, prop, value) {
                if (prop === 'addUser') {
                    target.push(value);
                    return true;
                }
                return false;
            }
        });

        proxy.addUser = { id: 4, name: 'David', active: true };
        print('Active Users:', proxy.activeUsers);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

(async () => {
    const api = new API();
    await fetchAndProcessData(api);
})();
