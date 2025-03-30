 

 
async function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
}

 
function createReactiveObject(target, callback) {
  return new Proxy(target, {
    set(obj, prop, value) {
      obj[prop] = value;
      callback(obj);
      return true;
    }
  });
}

 
function updateDOM(state) {
  print(`Updated state: ${JSON.stringify(state)}`);
}

 
let state = createReactiveObject({ message: 'Loading...' }, updateDOM);

 
(async function loadData() {
  try {
    const data = await fetchData('https://example.com/api');
    state.message = data;
  } catch (error) {
    state.message = `Error: ${error.message}`;
  }
})();
