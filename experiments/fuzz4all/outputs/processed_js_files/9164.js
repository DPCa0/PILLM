 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ userId: 1, username: "advancedCoder", points: 100 });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });
}

 
async function displayUserPoints() {
  const urls = [
    "https://api.example.com/data",
    "https://api.invalid.com/error",
  ];

  for await (const result of urls.map(url => fetchData(url).catch(err => err))) {
    if (result instanceof Error) {
      console.error(`Failed to fetch data: ${result.message}`);
    } else {
      print(`User: ${result.username}, Points: ${result.points}`);
    }
  }
}

 
const additionalData = { badges: ["advanced", "promises", "async"], level: 5 };
const userProfile = { ...additionalData, name: "advancedCoder", id: 1 };

 
function logMessage(strings, userName, userLevel) {
  return `${strings[0]}${userName}${strings[1]}${userLevel}${strings[2]}`;
}

const message = logMessage`Welcome, ${userProfile.name}! Your current level is: ${userProfile.level}.`;
print(message);

displayUserPoints();
