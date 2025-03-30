 

 
class Utils {
    static async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Property "${prop}" accessed`);
            return Reflect.get(target, prop, receiver);
        } else {
            throw new Error(`Property "${prop}" does not exist`);
        }
    },
    set(target, prop, value, receiver) {
        if (typeof value === 'number') {
            print(`Setting property "${prop}" to ${value}`);
            return Reflect.set(target, prop, value, receiver);
        } else {
            throw new Error(`Property "${prop}" must be a number`);
        }
    }
};

 
const data = { count: 0 };

 
const proxiedData = new Proxy(data, handler);

 
(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const { id, title, ...rest } = await Utils.fetchData(url) || {};
    if (id) {
        proxiedData.count = id;  
        print(`Title: ${title}`);
        print('Other Data:', rest);
        print(`Proxied Count: ${proxiedData.count}`);  
    }
})();
