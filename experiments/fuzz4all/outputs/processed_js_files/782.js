 
async function* fetchChunks(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    yield response.json();
  }
}

 
const handler = {
  set(target, prop, value) {
    print(`Property ${prop} changed to ${value}`);
    target[prop] = value;
    return true;
  },
};

const reactiveObject = new Proxy({}, handler);

 
function counter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const increment = counter();

 
(async ({ log }) => {
  log("Starting complex JavaScript program");

   
  const urls = ["https://api.example.com/data1", "https://api.example.com/data2"];
  for await (const data of fetchChunks(urls)) {
    log("Fetched data:", data);
  }

   
  reactiveObject.name = "JavaScript";
  reactiveObject.version = "ES2021";

   
  log("Counter values:");
  log(increment());
  log(increment());

   
  const config = {
    settings: {
      theme: "dark",
    },
  };

  const theme = config?.settings?.theme ?? "light";
  log("Current theme:", theme);
})({ log: console.log });
