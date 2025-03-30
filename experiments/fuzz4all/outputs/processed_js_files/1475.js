class Observable {
  constructor(value) {
    this._value = value;
    this._listeners = new Set();
  }

  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  notify() {
    this._listeners.forEach(listener => listener(this._value));
  }

  set value(newValue) {
    if (newValue !== this._value) {
      this._value = newValue;
      this.notify();
    }
  }

  get value() {
    return this._value;
  }
}

const asyncDataFetcher = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching error:', error);
    return null;
  }
};

(async () => {
  const state = new Observable({ data: null, loading: true, error: null });

  const unsubscribe = state.subscribe(currentState => {
    print('State updated:', currentState);
  });

  state.value = { ...state.value, loading: true };

  const data = await asyncDataFetcher('https://jsonplaceholder.typicode.com/posts');
  if (data) {
    state.value = { data, loading: false, error: null };
  } else {
    state.value = { data: null, loading: false, error: 'Failed to fetch data' };
  }

  unsubscribe();
})();
