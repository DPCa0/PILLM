 

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const asyncFetchData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Alice", age: 28 },
        { id: 2, name: "Bob", age: 34 },
        { id: 3, name: "Charlie", age: 25 },
      ]);
    }, 1000);
  });

const processData = async () => {
  try {
    const data = await asyncFetchData();
    const transformedData = data.map(({ id, name, age }) => ({
      userId: id,
      fullName: name.toUpperCase(),
      isAdult: age >= 18,
    }));

    return transformedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

(async () => {
  try {
    const idGen = idGenerator();
    const [first, ...rest] = await processData();

    console.log("First user processed:", {
      ...first,
      uniqueId: idGen.next().value,
    });

    print("Other users processed:");
    rest.forEach((user) =>
      console.log({ ...user, uniqueId: idGen.next().value })
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
