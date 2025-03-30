class ReactiveValue {
  #value;
  #listeners = new Set();

  constructor(initialValue) {
    this.#value = initialValue;
  }

  get value() {
    return this.#value;
  }

  set value(newValue) {
    if (this.#value !== newValue) {
      this.#value = newValue;
      this.#listeners.forEach(listener => listener(newValue));
    }
  }

  subscribe(listener) {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
  return response.json();
};

const createElement = (tag, props = {}, ...children) => {
  const element = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => element[key] = value);
  children.forEach(child => element.appendChild(
    child instanceof Node ? child : document.createTextNode(child)
  ));
  return element;
};

const appState = new ReactiveValue({ data: null, loading: true, error: null });

const app = () => {
  const root = document.getElementById('root');

  const updateUI = ({ data, loading, error }) => {
    root.innerHTML = '';
    if (loading) {
      root.appendChild(createElement('p', {}, 'Loading...'));
    } else if (error) {
      root.appendChild(createElement('p', { style: 'color: red;' }, error));
    } else if (data) {
      root.appendChild(createElement('ul', {}, ...data.map(item => createElement('li', {}, item.title))));
    }
  };

  appState.subscribe(updateUI);

  const loadData = async () => {
    appState.value = { ...appState.value, loading: true, error: null };
    try {
      const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
      appState.value = { ...appState.value, data, loading: false };
    } catch (error) {
      appState.value = { ...appState.value, loading: false, error: error.message };
    }
  };

  loadData();
};

app();
