(async () => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    class EventEmitter {
        constructor() {
            this.events = new Map();
        }
        on(event, listener) {
            if (!this.events.has(event)) this.events.set(event, []);
            this.events.get(event).push(listener);
        }
        emit(event, ...args) {
            if (this.events.has(event)) {
                for (const listener of this.events.get(event)) {
                    listener(...args);
                }
            }
        }
    }

    const emitter = new EventEmitter();
    emitter.on('greet', async (name) => {
        print(`Hello, ${name}!`);
        await sleep(1000);
        print('How are you today?');
    });

    const fetchData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    };

    try {
        const data = await fetchData();
        const firstPost = data[0];

        emitter.emit('greet', 'world');
        await sleep(1500);
        print(`Here's a post title: ${firstPost.title}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
