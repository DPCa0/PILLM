class PubSub {
    #events = new Map();

    subscribe(event, listener) {
        if (!this.#events.has(event)) {
            this.#events.set(event, new Set());
        }
        this.#events.get(event).add(listener);
    }

    unsubscribe(event, listener) {
        this.#events.get(event)?.delete(listener);
    }

    publish(event, data) {
        this.#events.get(event)?.forEach(listener => listener(data));
    }
}

const asyncFetch = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error fetching: ${response.statusText}`);
    return response.json();
};

(async () => {
    const pubsub = new PubSub();
    const apiURL = 'https://jsonplaceholder.typicode.com/posts';

    pubsub.subscribe('dataReceived', data => {
        print(`Received ${data.length} items`);
        data.forEach(item => print(`Title: ${item.title}`));
    });

    pubsub.subscribe('error', error => console.error(`Error: ${error.message}`));

    try {
        const data = await asyncFetch(apiURL);
        pubsub.publish('dataReceived', data);
    } catch (error) {
        pubsub.publish('error', error);
    }
})();
