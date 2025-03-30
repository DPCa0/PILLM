 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'Hello, World!' });
    }, 1000);
  });
};

 
const handler = {
  get: (target, prop) => {
    print(`Property ${prop} was accessed`);
    return target[prop];
  }
};

 
const highlight = (strings, ...values) => {
  return strings.reduce((result, string, i) => {
    const value = values[i] ? `<span class="highlight">${values[i]}</span>` : '';
    return result + string + value;
  }, '');
};

 
(async () => {
  const dataProxy = new Proxy(await fetchData(), handler);

  const template = highlight`The fetched message is: ${dataProxy.data}`;
  print(template);  
})();
