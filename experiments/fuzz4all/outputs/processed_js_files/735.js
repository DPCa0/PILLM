 

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      url ? resolve(`Data from ${url}`) : reject("No URL provided");
    }, 1000);
  });
};

 
const getData = async (url) => {
  try {
    const data = await fetchData(url);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

 
const uniqueId = Symbol("id");

 
const createDataProxy = (data) => {
  return new Proxy(data, {
    get(target, property) {
      if (property in target) {
        print(`Getting value of ${property}`);
        return target[property];
      } else {
        throw new Error(`Property ${property} does not exist`);
      }
    },
    set(target, property, value) {
      print(`Setting value of ${property} to ${value}`);
      target[property] = value;
      return true;
    },
  });
};

 
const main = async () => {
  const url = "https://api.example.com/data";
  let responseData;

  try {
    responseData = await getData(url);
    print(responseData);
  } catch (error) {
    console.error(error);
  }

   
  const data = createDataProxy({
    [uniqueId]: 1,
    name: "Example Data",
    description: "A proxy wrapped object with data",
  });

   
  print(data.name);
  data.name = "Updated Example Data";

  try {
    print(data.nonExistentProperty);  
  } catch (error) {
    console.error(error);
  }
};

 
main();
