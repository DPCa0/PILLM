class User {
  #privateData = 'Secret';
  
  constructor(name) {
    this.name = name;
  }
  
  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  
  #showPrivateData() {
    print(this.#privateData);
  }
  
  accessPrivateData() {
    this.#showPrivateData();
  }
}

const getDataWithProxy = (user) => {
  return new Proxy(user, {
    get(target, prop) {
      if (prop === 'fetchData') {
        return (...args) => {
          print(`Intercepted call to ${prop}`);
          return target[prop](...args);
        };
      }
      return target[prop];
    }
  });
};

(async () => {
  const user = new User('Alice');
  user.accessPrivateData();
  
  const proxyUser = getDataWithProxy(user);
  
  const data = await proxyUser.fetchData('https://api.example.com/data');
  print(data);

  const fibonacci = (n, memo = {}) => {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  };

  print('Fibonacci(10):', fibonacci(10));
})();
