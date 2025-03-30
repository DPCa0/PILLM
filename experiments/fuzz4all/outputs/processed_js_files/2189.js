class Observable {
    constructor() {
        this.observers = new Set();
    }

    subscribe(fn) {
        this.observers.add(fn);
    }

    unsubscribe(fn) {
        this.observers.delete(fn);
    }

    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}

const dataStream = new Observable();

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        dataStream.notify(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

const processData = (data) => {
    const output = data.reduce((acc, item) => {
        if (item.value > 10) {
            acc.push({ id: item.id, transformed: item.value * 2 });
        }
        return acc;
    }, []);
    console.table(output);
};

dataStream.subscribe(processData);

 
fetchData('https://api.example.com/data');
