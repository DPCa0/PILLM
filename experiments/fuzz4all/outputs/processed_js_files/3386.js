 
const complexObject = {
    name: "Advanced JS",
    level: 10,
    components: [
        { id: 1, description: "Closure" },
        { id: 2, description: "Promise" },
        { id: 3, description: "Async/Await" }
    ],
    greet() {
        return `Welcome to ${this.name}`;
    },
    async fetchData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Failed to fetch data");
        }
    },
    getComponentDescriptionById(id) {
        return this.components.find(comp => comp.id === id)?.description;
    }
};

 
const handler = {
    get(target, property) {
        if (property in target) {
            return target[property];
        } else {
            throw new Error(`Property ${property} doesn't exist`);
        }
    },
    set(target, property, value) {
        if (property === 'level' && value > 10) {
            throw new Error('Level cannot exceed 10');
        }
        target[property] = value;
        return true;
    }
};

const proxiedObject = new Proxy(complexObject, handler);

// Use a generator function to iterate components
function* componentIterator(components) {
    for (const component of components) {
        yield component.description;
    }
}

// Example usage
print(proxiedObject.greet());
const iterator = componentIterator(proxiedObject.components);
print(iterator.next().value);
print(iterator.next().value);

// Attempt to set an invalid level
try {
    proxiedObject.level = 15;
} catch (error) {
    console.error(error.message);
}

// Fetch and log data from a public API (replace 'https: 
(async () => {
    try {
        const data = await proxiedObject.fetchData('https://api.example.com/data');
        print(data);
    } catch (error) {
        console.error(error.message);
    }
})();
