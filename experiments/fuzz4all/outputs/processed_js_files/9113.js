 
class ComplexFeatureDemo {
    #privateField = 42;   
    static #staticPrivateField = 'Static Secret';   

    #privateMethod() {   
        return `Private value is ${this.#privateField}`;
    }

    static #staticPrivateMethod() {   
        return `Accessing ${this.#staticPrivateField}`;
    }

     
    revealSecret() {
        const secretMessage = 'Closure Secret';
        return (() => `Revealed: ${secretMessage} and ${this.#privateMethod()}`)();
    }

     
    async fetchData(url) {
        try {
            let response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            let data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetching error: ', error);
            throw error;
        }
    }

     
    static staticDemo() {
        return `Static says: ${this.#staticPrivateMethod()}`;
    }
}

 
const demo = new ComplexFeatureDemo();
print(demo.revealSecret());

 
print(ComplexFeatureDemo.staticDemo());

 
(async () => {
    try {
        const data = await demo.fetchData('https://jsonplaceholder.typicode.com/posts/1');
        print('Fetched data:', data);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
})();
