 
 

const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Data 1", "Data 2", "Data 3"]);
    }, 1000);
  });
};

const processData = async (data) => {
  const processedData = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.map(item => `${item} Processed`));
    }, 1000);
  });
  return processedData;
};

function* dataPipeline() {
  const rawData = yield fetchData();
  const transformedData = yield processData(rawData);
  return transformedData;
}

const executePipeline = async (generator) => {
  const generatorObj = generator();

  const step1 = await generatorObj.next().value;
  const step2 = await generatorObj.next(step1).value;
  const finalResult = generatorObj.next(step2).value;
  
  print(finalResult);
};

executePipeline(dataPipeline);
