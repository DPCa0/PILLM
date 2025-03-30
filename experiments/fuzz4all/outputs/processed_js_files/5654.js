 

 
async function fetchData(url) {
   
  await new Promise((resolve) => setTimeout(resolve, 1000));
   
  return { status: "ok", data: { message: "Hello, world!" } };
}

 
function createLogger(level) {
  return function (message) {
    print(`[${level.toUpperCase()}]: ${message}`);
  };
}

 
async function processResponse({ status = "unknown", data: { message = "No message" } = {} }) {
  if (status === "ok") {
    successLogger(message);
  } else {
    errorLogger("Failed to fetch data");
  }
}

 
const logHandler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    }
    return () => console.warn(`Logging level '${prop}' is not defined.`);
  },
};

const logger = new Proxy(
  {
    info: createLogger("info"),
    success: createLogger("success"),
    error: createLogger("error"),
  },
  logHandler
);

const { info: infoLogger, success: successLogger, error: errorLogger } = logger;

 
(async () => {
  try {
    infoLogger("Fetching data...");
    const response = await fetchData("https://api.example.com/data");
    await processResponse(response);
  } catch (error) {
    errorLogger(`An error occurred: ${error.message}`);
  }
})();
