class AdvancedFeatureExample {
    #privateField = "I am private";  

    constructor(name) {
        this.name = name;
    }

    async fetchData(url) {
        try {
            const response = await fetch(url);  
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            print('Fetched Data:', data);
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    }

    *generateSequence(start, end) {  
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }

    printPrivate() {
        print(this.#privateField);
    }

    static #staticPrivateMethod() {
        return 'Static Private Method Accessed';
    }

    static accessStaticPrivateMethod() {
        return this.#staticPrivateMethod();
    }
}

 
const handler = {
    get(target, property) {
        if (property in target) {
            return `Accessed property "${property}" with value: ${target[property]}`;
        } else {
            return `Property "${property}" does not exist`;
        }
    }
};

const obj = new AdvancedFeatureExample('JavaScript');
const proxiedObj = new Proxy(obj, handler);

print(proxiedObj.name);
obj.fetchData('https://jsonplaceholder.typicode.com/posts/1');

for (const num of obj.generateSequence(1, 5)) {
    print('Generated:', num);
}

obj.printPrivate();
print(AdvancedFeatureExample.accessStaticPrivateMethod());
