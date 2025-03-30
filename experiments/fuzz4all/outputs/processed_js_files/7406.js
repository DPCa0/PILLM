 

const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: "Example data from API" });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });
};

const fetchAndTransformData = async (url) => {
  try {
    let { data } = await fetchData(url);

    const handler = {
      get(target, prop) {
        if (prop in target) {
          return target[prop];
        } else {
          throw new ReferenceError(`Property ${prop} does not exist`);
        }
      },
      set(target, prop, value) {
        print(`Setting value of ${prop} to ${value}`);
        target[prop] = value;
        return true;
      },
    };

    const proxyData = new Proxy({ original: data }, handler);

    proxyData.transformed = data.toUpperCase();
    print(proxyData.transformed);

  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

fetchAndTransformData("https://api.example.com/data");
