 
class AdvancedWidget {
  #privateData = "Sensitive Info";

  constructor(name) {
    this.name = name;
    this.metadata = {
      created: new Date(),
      updated: new Date(),
    };
  }

   
  status = 'initialized';

   
  static async *fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    yield* data.results;
  }

  updateStatus(newStatus) {
    this.status = newStatus;
    this.metadata.updated = new Date();
  }

   
  #getPrivateData() {
    return this.#privateData;
  }

  showPrivateData() {
    print(this.#getPrivateData());
  }
}

 
const handler = {
  get(target, prop) {
    if (prop === 'metadata') {
      return `This property is protected: ${target[prop].created.toLocaleString()}`;
    }
    return Reflect.get(...arguments);
  }
};

const widget = new AdvancedWidget("SuperWidget");
const proxyWidget = new Proxy(widget, handler);

print(proxyWidget.name);  
print(proxyWidget.metadata);  

widget.updateStatus("operational");
print(widget.status);  

widget.showPrivateData();  

 
(async () => {
  for await (const item of AdvancedWidget.fetchData('https://pokeapi.co/api/v2/pokemon?limit=5')) {
    print(item.name);  
  }
})();
