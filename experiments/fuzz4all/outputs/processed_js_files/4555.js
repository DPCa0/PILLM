 
class Reactive {
  constructor(target) {
    this.proxy = new Proxy(target, {
      set: (obj, prop, value) => {
        print(`Property ${prop} set to ${value}`);
        obj[prop] = value;
        return true;
      },
    });
  }

  observe(callback) {
    this.callback = callback;
  }

  notify(key, value) {
    if (this.callback) this.callback(key, value);
  }

  get target() {
    return this.proxy;
  }
}

async function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: `Data from ${url}` });
    }, 1000);
  });
}

async function main() {
  const data = new Reactive({ url: "", response: "" });

  data.observe((key, value) => {
    if (key === 'url') {
      fetchData(value).then((res) => {
        data.target.response = res.data;
      });
    }
  });

  data.target.url = "https://api.mock.com/data";
  data.target.url = "https://api.mock.com/other";

   
  await new Promise((r) => setTimeout(r, 2500));

  print(`Final response: ${data.target.response}`);
}

main();
