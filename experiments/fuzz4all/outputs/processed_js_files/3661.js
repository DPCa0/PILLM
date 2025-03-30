 
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

 
const fetchData = async () => {
  const data = await new Promise((resolve) => 
    setTimeout(() => resolve({ name: "John Doe", age: 25, city: "New York" }), 1000)
  );
  return data;
};

 
const transformData = ({ name, age, city }) => ({
  description: `Name: ${name}, Age: ${age}, City: ${city.toUpperCase()}`,
});

 
const logData = (prefix) => (data) => {
  print(`${prefix}: ${data.description}`);
};

 
(async () => {
  try {
    const processAndLogData = compose(
      logData("User Info"),
      transformData
    );

    const data = await fetchData();
    processAndLogData(data);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
