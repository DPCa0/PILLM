 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

 
const handler = {
  get(target, prop) {
    print(`Property '${prop}' has been accessed.`);
    return target[prop];
  }
};

 
class ComplexObject {
  #data;
  #fetchData = fetchData;

  constructor(dataUrl) {
    this.#data = Symbol();
    this.dataUrl = dataUrl;
  }

  async loadData() {
    try {
      this[this.#data] = await this.#fetchData(this.dataUrl);
      print('Data loaded successfully.');
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }

  get data() {
    return new Proxy(this[this.#data], handler);
  }
}

 
function url(strings, ...values) {
  return strings.reduce((result, string, i) => result + string + (values[i] || ''), '');
}

 
(async () => {
  const apiEndpoint = url`https: 
  const complexObject = new ComplexObject(apiEndpoint);

  await complexObject.loadData();
  print(complexObject.data);

   
  print(complexObject.data.userId);
})();
