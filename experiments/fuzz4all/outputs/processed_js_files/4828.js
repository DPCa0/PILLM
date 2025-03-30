 
class DataService {
    constructor() {
        this.data = new Proxy({}, {
            get(target, prop) {
                print(`Getting value of ${prop}`);
                return Reflect.get(target, prop);
            },
            set(target, prop, value) {
                print(`Setting value of ${prop} to ${value}`);
                return Reflect.set(target, prop, value);
            }
        });
    }

    async fetchData() {
        this.data.status = 'fetching';
        try {
            const response = await this.simulateAsyncApiCall();
            this.data.items = response;
            this.data.status = 'complete';
        } catch (error) {
            console.error('Error fetching data:', error);
            this.data.status = 'error';
        }
    }

    simulateAsyncApiCall() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.2 ? resolve(['item1', 'item2', 'item3']) : reject('API error');
            }, 1000);
        });
    }
}

(async () => {
    const dataService = new DataService();
    print('Initial status:', dataService.data.status);
    await dataService.fetchData();
    print('Final status:', dataService.data.status);
    print('Data items:', dataService.data.items);
})();
