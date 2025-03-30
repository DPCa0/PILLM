(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

   
  const arrayHandler = {
    get: (target, property) => {
      if (typeof property === 'string' && !isNaN(property)) {
        print(`Accessing index ${property}`);
      }
      return Reflect.get(target, property);
    },
    set: (target, property, value) => {
      print(`Setting index ${property} to ${value}`);
      return Reflect.set(target, property, value);
    }
  };

  const proxiedArray = new Proxy([1, 2, 3], arrayHandler);

   
  function* fibonacci(n) {
    let [prev, curr] = [0, 1];
    while (n-- > 0) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }

  const fibSeq = fibonacci(5);
  print([...fibSeq]);  

   
  async function fetchData() {
    print("Fetching data...");
    await delay(1000);
    print("Data fetched!");
    return { data: [1, 2, 3, 4, 5] };
  }

  try {
    const result = await fetchData();
    print("Result:", result);
  } catch (error) {
    console.error("Error:", error);
  }

   
  function multiplier(factor) {
    return number => number * factor;
  }

  const double = multiplier(2);
  print("Double 4:", double(4));

   
  proxiedArray[1];  
  proxiedArray[2] = 42;  
  print("Modified array:", proxiedArray);
})();
