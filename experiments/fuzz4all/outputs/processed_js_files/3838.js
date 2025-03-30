class NetworkManager {
  #connections = new WeakMap();

  constructor() {
    this.connections = [];
  }

  async connectToServer(server) {
    const connection = await this.#simulateNetworkRequest(server);
    this.#connections.set(server, connection);
    this.connections.push(server);
    return `Connected to ${server}`;
  }

  async #simulateNetworkRequest(server) {
     
    const delay = Math.floor(Math.random() * 1000);
    return new Promise(resolve => setTimeout(() => resolve(`Connection to ${server}`), delay));
  }

  *connectedServers() {
    for (let server of this.connections) {
      yield server;
    }
  }

  async *[Symbol.asyncIterator]() {
    for (let server of this.connectedServers()) {
      yield await this.#connections.get(server);
    }
  }

  disconnect(server) {
    if (this.#connections.has(server)) {
      this.#connections.delete(server);
      this.connections = this.connections.filter(s => s !== server);
      return `Disconnected from ${server}`;
    }
    return `No connection to ${server} found`;
  }
}

(async () => {
  const manager = new NetworkManager();

  print(await manager.connectToServer('server1'));
  print(await manager.connectToServer('server2'));

  for await (let connection of manager) {
    print(connection);
  }

  print(manager.disconnect('server1'));
  print(manager.disconnect('server3'));
})();
