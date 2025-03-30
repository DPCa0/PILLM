class Observable {
  constructor(initialValue) {
    this._value = initialValue;
    this._listeners = new Set();
  }
  
  subscribe(listener) {
    this._listeners.add(listener);
  }
  
  unsubscribe(listener) {
    this._listeners.delete(listener);
  }
  
  set value(newValue) {
    if (this._value !== newValue) {
      this._value = newValue;
      this._listeners.forEach(listener => listener(newValue));
    }
  }
  
  get value() {
    return this._value;
  }
}

function fetchData(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => data);
}

async function main() {
  const observable = new Observable("Initial Value");

   
  const listener = (newValue) => {
    print(`Observable value changed to: ${newValue}`);
  };

   
  observable.subscribe(listener);

   
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    observable.value = JSON.stringify(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }

   
  observable.unsubscribe(listener);
  observable.value = "Final Value (won't trigger listener)";
}

main();
