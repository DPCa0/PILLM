class PubSub {
    #subscribers = new Map();

    subscribe(event, fn) {
        if (!this.#subscribers.has(event)) this.#subscribers.set(event, []);
        this.#subscribers.get(event).push(fn);
    }

    unsubscribe(event, fn) {
        if (this.#subscribers.has(event)) {
            const subscribers = this.#subscribers.get(event);
            this.#subscribers.set(event, subscribers.filter(sub => sub !== fn));
        }
    }

    publish(event, data) {
        if (this.#subscribers.has(event)) {
            this.#subscribers.get(event).forEach(fn => fn(data));
        }
    }
}

const pubSub = new PubSub();

const logger = {
    log(data) {
        print(`Received: ${JSON.stringify(data)}`);
    }
};

const analytics = {
    track(data) {
        print(`Tracking event: ${data.type}, Details: ${JSON.stringify(data.details)}`);
    }
};

pubSub.subscribe('dataReceived', logger.log);
pubSub.subscribe('dataReceived', analytics.track);

pubSub.publish('dataReceived', { type: 'click', details: { x: 100, y: 200 } });

pubSub.unsubscribe('dataReceived', logger.log);

pubSub.publish('dataReceived', { type: 'submit', details: { formId: 1 } });
