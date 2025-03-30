 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com") {
        resolve({ data: "Sample data from " + url });
      } else {
        reject("Error fetching data");
      }
    }, 1000);
  });
};

 
function* asyncGenerator(urls) {
  for (let url of urls) {
    try {
      const data = yield fetchData(url);
      print(data);
    } catch (error) {
      console.error(error);
    }
  }
}

 
const processUrls = async (urls) => {
  const generator = asyncGenerator(urls);
  for (let url of urls) {
    let { value, done } = generator.next(url);
    if (!done) {
      try {
        let data = await value;
        generator.next(data);
      } catch (error) {
        generator.throw(error);
      }
    }
  }
};

 
const targetObject = { message: "Hello" };
const handler = {
  get: function (target, property) {
    print(`Getting ${property} from the object`);
    return target[property];
  },
  set: function (target, property, value) {
    print(`Setting ${property} to ${value} in the object`);
    target[property] = value;
  },
};

const proxiedObject = new Proxy(targetObject, handler);

processUrls(["https://example.com", "https://invalidurl.com"]);

 
print(proxiedObject.message);
proxiedObject.message = "New message";
print(proxiedObject.message);
