 
'use strict';

 
class ComplexWidget {
  constructor(name, version) {
    this.#privateData.set(this, { version: version });
    this.name = name;
  }

   
  #privateData = new WeakMap();

   
  static async loadWidgetLibrary() {
    const { default: WidgetLib } = await import('./widgetLibrary.js');
    return new WidgetLib();
  }

   
  static createLoggedWidget(name, version) {
    const widget = new ComplexWidget(name, version);
    return new Proxy(widget, {
      get(target, prop) {
        print(`Property ${prop} accessed`);
        return Reflect.get(target, prop);
      },
      set(target, prop, value) {
        print(`Property ${prop} set to ${value}`);
        return Reflect.set(target, prop, value);
      },
    });
  }

  getVersion() {
    return this.#privateData.get(this).version;
  }

  static *generateVersions() {
    yield* ['1.0.0', '1.1.0', '2.0.0', '3.0.0'];
  }

   
  async *fetchData(urls) {
    for (const url of urls) {
      const response = await fetch(url);
      yield response.json();
    }
  }
}

 
(async () => {
  const widget = ComplexWidget.createLoggedWidget('AdvancedWidget', '1.0.0');

  print(`Widget name: ${widget.name}`);
  print(`Widget version: ${widget.getVersion()}`);

  print('Loading Widget Library...');
  const widgetLib = await ComplexWidget.loadWidgetLibrary();
  print('Widget Library loaded:', widgetLib);

  print('Generating versions...');
  for (const version of ComplexWidget.generateVersions()) {
    print(`Available version: ${version}`);
  }

  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  print('Fetching data from URLs...');
  for await (const data of widget.fetchData(urls)) {
    print('Fetched data:', data);
  }
})();
