 

class AdvancedFeaturesDemo {
    constructor() {
        this.data = {
            message: 'Initial Message',
            count: 0
        };
        
        this.proxy = new Proxy(this.data, {
            get(target, property, receiver) {
                print(`Getting ${property}:`, target[property]);
                return Reflect.get(target, property, receiver);
            },
            set(target, property, value, receiver) {
                print(`Setting ${property} to`, value);
                return Reflect.set(target, property, value, receiver);
            }
        });
    }

    async changeMessage(newMessage) {
        await this.simulatedAsyncTask();
        this.proxy.message = newMessage;
    }

    async simulatedAsyncTask() {
        return new Promise(resolve => {
            setTimeout(() => {
                print('Async task complete.');
                resolve();
            }, 1000);
        });
    }

    async incrementCounter() {
        await this.simulatedAsyncTask();
        this.proxy.count += 1;
    }

    async demo() {
        print('Demo started');
        await this.changeMessage('Hello, advanced world!');
        await this.incrementCounter();
        print('Final Proxy Data:', this.proxy);
    }
}

(async () => {
    const demo = new AdvancedFeaturesDemo();
    await demo.demo();
})();
