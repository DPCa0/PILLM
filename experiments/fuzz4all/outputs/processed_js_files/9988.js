 
"use strict";

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Getting property ${prop}`);
    return Reflect.get(...arguments);
  },
  set: function(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

const obj = new Proxy({}, handler);
obj.example = "Hello, Proxy!";
print(obj.example);

 
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

 
const generator = generateSequence();
for (const value of generator) {
  print(value);
}

 
async function getData() {
  const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2"
  ];
  
  try {
    const dataPromises = urls.map(url => fetchData(url));
    const results = await Promise.all(dataPromises);
    print(results);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getData();
