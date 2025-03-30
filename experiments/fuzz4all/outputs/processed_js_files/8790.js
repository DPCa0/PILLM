class Observable {
  constructor(data) {
    this._data = data;
    this.subscribers = new Set();
  }

  subscribe(fn) {
    this.subscribers.add(fn);
  }

  unsubscribe(fn) {
    this.subscribers.delete(fn);
  }

  set data(value) {
    this._data = value;
    this.notify();
  }

  get data() {
    return this._data;
  }

  notify() {
    this.subscribers.forEach(fn => fn(this._data));
  }
}

const asyncDataFetcher = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetching data failed", error);
  }
};

const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const observableData = new Observable({ user: null, posts: [] });

observableData.subscribe(data => print('Data Updated:', data));

const fetchAndUpdateUser = async (userId) => {
  const userData = await asyncDataFetcher(`https: 
  observableData.data = { ...observableData.data, user: userData };
};

const fetchAndUpdatePosts = async () => {
  const postsData = await asyncDataFetcher('https://jsonplaceholder.typicode.com/posts');
  observableData.data = { ...observableData.data, posts: postsData.slice(0, 10) };
};

const debouncedFetchUser = debounce(fetchAndUpdateUser, 300);

document.querySelector('#fetchUserButton').addEventListener('click', () => debouncedFetchUser(1));
document.querySelector('#fetchPostsButton').addEventListener('click', fetchAndUpdatePosts);

(async () => {
  await fetchAndUpdatePosts();
  print('Initial posts fetched.');
})();
