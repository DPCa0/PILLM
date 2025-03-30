 

async function* fetchDataGenerator(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    yield data;
  }
}

const dataHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property ${prop}`);
      return target[prop];
    } else {
      return `Property ${prop} does not exist`;
    }
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

async function main() {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3',
  ];

  const postsProxy = new Proxy({}, dataHandler);

  for await (const { id, title, body } of fetchDataGenerator(urls)) {
    postsProxy[id] = { title, body };
  }

  print(postsProxy[1]);
  print(postsProxy[2]);
  print(postsProxy[3]);
}

main();
