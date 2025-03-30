 

function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const idGen = idGenerator();

const collectionHandler = {
    get(target, prop) {
        if (prop in target) {
            return Reflect.get(target, prop);
        } else if (prop === 'length') {
            return target.data.length;
        } else {
            console.warn(`Property ${prop} not found`);
        }
    },
    set(target, prop, value) {
        if (prop === 'data') {
            throw new Error('Cannot overwrite data array');
        }
        return Reflect.set(target, prop, value);
    },
    deleteProperty(target, prop) {
        if (prop === 'data') {
            throw new Error('Cannot delete data array');
        }
        return Reflect.deleteProperty(target, prop);
    },
    has(target, prop) {
        return Reflect.has(target, prop) || prop === 'length';
    }
};

class Collection {
    constructor() {
        this.data = [];
        return new Proxy(this, collectionHandler);
    }

    async addItem(item) {
        const id = idGen.next().value;
        const newItem = { id, ...item };
        this.data.push(newItem);
        return Promise.resolve(newItem);
    }

    findItem(predicate) {
        return this.data.find(predicate);
    }

    async removeItem(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index > -1) {
            this.data.splice(index, 1);
            return Promise.resolve(`Item with id ${id} removed.`);
        } else {
            return Promise.reject(`Item with id ${id} not found.`);
        }
    }
}

 
(async () => {
    const myCollection = new Collection();
    await myCollection.addItem({ name: 'item1', value: 100 });
    await myCollection.addItem({ name: 'item2', value: 200 });

    print('Collection Length:', myCollection.length);
    print('Find Item:', myCollection.findItem(item => item.value === 100));

    try {
        print(await myCollection.removeItem(1));
    } catch (e) {
        console.error(e);
    }

    print('Collection after removal:', myCollection.data);
})();
