(async () => {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  };

   
  const logProxyHandler = {
    set(target, property, value) {
      print(`Setting ${property} to ${value}`);
      target[property] = value;
      return true;
    },
  };

  let dataProxy = new Proxy({}, logProxyHandler);

  try {
     
    const { userId, id, title = "No title" } = await fetchData(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    dataProxy.userId = userId;
    dataProxy.id = id;
    dataProxy.title = title;

     
    const uniqueItems = new Set([1, 2, 3, 3, 4, 5]);
    print("Unique Items:", [...uniqueItems]);

     
    const map = new Map();
    map.set("title", dataProxy.title);
    print("Map Get:", map.get("title"));

     
    print("Description:", dataProxy?.description ?? "No description");
  } catch (error) {
    console.error("Error:", error);
  }
})();
