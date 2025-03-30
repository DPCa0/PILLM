 

const fetchData = async (url) => {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('There was a problem with fetch operation:', error);
    }
};

const apiHandler = {
    get: function (target, prop) {
        if (prop in target) {
            print(`Getting ${prop} value: ${target[prop]}`);
            return target[prop];
        } else {
            console.warn(`Property ${prop} does not exist on target`);
            return undefined;
        }
    },
    set: function (target, prop, value) {
        print(`Setting ${prop} value to ${value}`);
        target[prop] = value;
         
        return true;
    }
};

const reactiveData = new Proxy({}, apiHandler);

 
(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const data = await fetchData(url);
    reactiveData.title = data.title;  
    print(reactiveData.title);  
})();

 
Promise.resolve()
    .then(() => {
        print('Step 1');
        return Promise.reject('Error in Step 2');
    })
    .then(() => {
        print('Step 2');
    })
    .catch(err => {
        console.error('Caught an error:', err);
    })
    .finally(() => {
        print('Cleanup actions');
    });
