 
 

class Observable {
  constructor(obj) {
    return new Proxy(obj, this.handler());
  }

  handler() {
    return {
      set: (target, prop, value) => {
        print(`Property '${prop}' changed from '${target[prop]}' to '${value}'`);
        target[prop] = value;
        return true;
      }
    };
  }
}

async function* fetchSequentially(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    yield data;
  }
}

const user = new Observable({ name: "Alice", age: 25 });

(async () => {
  user.name = "Bob";   

  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2'
  ];

  try {
    for await (const data of fetchSequentially(urls)) {
      print(`Fetched data: ${JSON.stringify(data, null, 2)}`);
    }
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
})();

function* range(start, end) {
  while (start < end) {
    yield start++;
  }
}

for (const num of range(1, 5)) {
  print(`Number from range: ${num}`);  
}
