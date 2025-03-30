 

(async () => {
   
  const fetchData = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: [10, 20, 30, 40, 50] }), 1000)
    );

   
  const { data: numbers } = await fetchData();

   
  const createComplexOperation = (array) => {
     
    const sum = array.reduce((acc, num) => acc + num, 0);
     
    const average = sum / array.length;

     
    return (operation) => {
      return array.map((num) => operation(num, average));
    };
  };

   
  const operations = {
    multiplyByAverage: (num, avg) => num * avg,
    subtractAverage: (num, avg) => num - avg,
  };

   
  const processNumbers = createComplexOperation(numbers);

  print("Multiply by Average:", processNumbers(operations.multiplyByAverage));
  print("Subtract Average:", processNumbers(operations.subtractAverage));
})();
