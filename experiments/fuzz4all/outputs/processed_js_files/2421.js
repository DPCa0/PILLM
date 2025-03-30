 
async function fetchDataAndTransform(url) {
  try {
     
    let response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

     
    let data = await response.json();

     
    let transformedData = data.map(({ id, value }) => ({ id, squaredValue: value * value }))
                              .reduce((acc, { id, squaredValue }) => {
                                acc[id] = squaredValue;
                                return acc;
                              }, {});

     
    let template = (strings, ...keys) => (function (...values) {
      let dict = values[values.length - 1] || {};
      return strings.reduce((acc, str, i) => acc + str + (dict[keys[i]] || ''), '');
    });

    const formatResult = template`ID: ${'id'}, Squared Value: ${'squaredValue'}`;

     
    const dataAccessHandler = {
      get(target, prop, receiver) {
        if (Reflect.has(target, prop)) {
          print(`Accessing ID: ${prop}, Value: ${target[prop]}`);
          return Reflect.get(target, prop, receiver);
        }
        return undefined;
      }
    };

    let proxyData = new Proxy(transformedData, dataAccessHandler);

     
    for (let id of Object.keys(proxyData)) {
      print(formatResult({ id, squaredValue: proxyData[id] }));
    }

  } catch (error) {
    console.error("Failed to fetch and transform data:", error);
  }
}

 
fetchDataAndTransform('https://api.example.com/data');
