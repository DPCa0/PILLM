class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  async processValues(callback) {
    for (const value of this) {
      await callback(value);
    }
  }
}

(async () => {
  const list = new LinkedList();
  list.add(1);
  list.add(2);
  list.add(3);

  const callback = async (value) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));  
    print(`Processed value: ${value}`);
  };

  print('Start processing:');
  await list.processValues(callback);
  print('Finished processing');
})();
