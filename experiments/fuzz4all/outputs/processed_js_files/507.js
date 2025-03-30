class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const createObservable = (initialValue) => {
  let value = initialValue;
  const subscribers = new Set();

  const notify = () => {
    subscribers.forEach((fn) => fn(value));
  };

  return {
    subscribe: (fn) => {
      subscribers.add(fn);
      fn(value);
      return () => subscribers.delete(fn);
    },
    set: (newValue) => {
      if (newValue !== value) {
        value = newValue;
        notify();
      }
    },
  };
};

const observable = createObservable(0);

const updateUI = (data) => {
  print('Data updated:', data);
};

observable.subscribe(updateUI);

const fetchDataWithTimeout = async (url, timeout = 5000) => {
  const deferred = new Deferred();
  
  const timer = setTimeout(() => {
    deferred.reject(new Error('Request timed out'));
  }, timeout);

  try {
    const data = await Promise.race([fetchData(url), deferred.promise]);
    observable.set(data);
    clearTimeout(timer);
  } catch (error) {
    console.error(error);
    clearTimeout(timer);
  }
};

 
fetchDataWithTimeout('https://jsonplaceholder.typicode.com/todos/1');
