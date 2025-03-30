class Observable {
  constructor(value) {
    this._value = value;
    this._listeners = new Set();
  }
  
  get value() {
    return this._value;
  }
  
  set value(newValue) {
    if (newValue !== this._value) {
      this._value = newValue;
      this._notify();
    }
  }
  
  _notify() {
    this._listeners.forEach(listener => listener(this._value));
  }
  
  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }
}

const useAsyncData = async (observable, url) => {
  const response = await fetch(url);
  const data = await response.json();
  observable.value = data;
};

const observableData = new Observable(null);

const unsubscribe = observableData.subscribe(newValue => {
  print('Data updated:', newValue);
});

(async () => {
  await useAsyncData(observableData, 'https://jsonplaceholder.typicode.com/posts');
  setTimeout(() => {
    print('Unsubscribing from data updates.');
    unsubscribe();
  }, 5000);
})();
