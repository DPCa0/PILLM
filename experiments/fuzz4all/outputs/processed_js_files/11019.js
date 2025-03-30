 
const widgetRegistry = Symbol('widgetRegistry');

class Widget {
  constructor(name) {
    this.name = name;
    if (!Widget[widgetRegistry]) {
      Widget[widgetRegistry] = new Map();
    }
    Widget[widgetRegistry].set(name, this);
  }
  
  static getWidgetByName(name) {
    return Widget[widgetRegistry]?.get(name);
  }
  
  static * [Symbol.iterator]() {
    for (const widget of Widget[widgetRegistry].values()) {
      yield widget;
    }
  }
  
  describe() {
    return `Widget: ${this.name}`;
  }
}

 
function createLoggingProxy(target) {
  return new Proxy(target, {
    get(obj, prop) {
      print(`Accessing property "${prop}"`);
      return obj[prop];
    },
    set(obj, prop, value) {
      print(`Setting property "${prop}" to ${value}`);
      obj[prop] = value;
      return true;
    }
  });
}

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

 
async function getDataFromMultipleSources(urls) {
  try {
    const results = await Promise.all(urls.map(fetchData));
    const [first, second, third] = results;
    print({ first, second, third });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
new Widget('Widget1');
new Widget('Widget2');
new Widget('Widget3');

 
for (const widget of Widget) {
  print(widget.describe());
}

 
const widgetProxy = createLoggingProxy({ prop1: 42, prop2: 'foo' });
print(widgetProxy.prop1);
widgetProxy.prop2 = 'bar';

 
const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
getDataFromMultipleSources(urls);
