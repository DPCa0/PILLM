 

 
const fetchData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ id: 1, name: 'John Doe', age: 28 }), 1000)
  );

 
function* dataGenerator() {
  print('Fetching data...');
  const data = yield fetchData();
  print('Processing data...');
  const processedData = yield processData(data);
  print('Data processed:', processedData);
}

 
const processData = async (data) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const { id, name, age } = data;
      resolve({ userId: id, userName: name.toUpperCase(), userAge: age + 1 });
    }, 1000)
  );
};

 
const runGenerator = (gen) => {
  const iterator = gen();

  const iterate = (iteration) => {
    if (iteration.done) return iteration.value;
    return Promise.resolve(iteration.value).then((res) => iterate(iterator.next(res)));
  };

  iterate(iterator.next());
};

 
runGenerator(dataGenerator);
