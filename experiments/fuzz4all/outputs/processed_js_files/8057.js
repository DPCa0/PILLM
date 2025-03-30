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
      this.events.get(event).forEach(listener => listener.apply(this, args));
    }
  }
}

 
function createUser({ name = "Guest", age = 18, ...rest } = {}) {
  return { id: Date.now(), name, age, ...rest };
}

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return data;
}

 
function* fibonacci(limit = 10) {
  let [prev, curr] = [0, 1];
  while (limit--) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
const emitter = new EventEmitter();

emitter.on('data', data => {
  print('Received data:', data);
});

(async () => {
  try {
    const user = createUser({ name: "Alice", occupation: "Developer" });
    print("Created user:", user);

    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    emitter.emit('data', data);

    print("Fibonacci Sequence:");
    for (let value of fibonacci(5)) {
      print(value);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
