class Observable {
  constructor(value) {
    this._listeners = new Set();
    this._value = value;
  }

  subscribe(listener) {
    this._listeners.add(listener);
    listener(this._value);
    return () => this._listeners.delete(listener);
  }

  set value(newValue) {
    if (newValue !== this._value) {
      this._value = newValue;
      this._listeners.forEach(listener => listener(newValue));
    }
  }

  get value() {
    return this._value;
  }
}

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const userInput = new Observable('https://jsonplaceholder.typicode.com/posts');
const debouncedFetch = debounce(async (url) => {
  try {
    const data = await fetchData(url);
    print('Fetched Data:', data.slice(0, 5));  
  } catch (error) {
    console.error('Fetch error:', error);
  }
}, 500);

userInput.subscribe(debouncedFetch);

const simulateInput = (url) => {
  print(`Simulating user input: ${url}`);
  userInput.value = url;
};

simulateInput('https://jsonplaceholder.typicode.com/comments');
setTimeout(() => simulateInput('https://jsonplaceholder.typicode.com/users'), 1000);
