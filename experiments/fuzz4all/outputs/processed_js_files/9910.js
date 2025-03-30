class AsyncStack {
  constructor() {
    this.stack = [];
  }

  async pushAsync(element) {
    this.stack.push(await this.resolveAsync(element));
  }

  async popAsync() {
    if (this.stack.length === 0) {
      throw new Error("Stack is empty");
    }
    return await this.resolveAsync(this.stack.pop());
  }

  async resolveAsync(value) {
     
    return new Promise((resolve) => setTimeout(() => resolve(value), 100));
  }

  *[Symbol.iterator]() {
    for (const element of this.stack) {
      yield element;
    }
  }

  async *asyncReverseIterator() {
    for (let i = this.stack.length - 1; i >= 0; i--) {
      yield await this.resolveAsync(this.stack[i]);
    }
  }
}

(async () => {
  const stack = new AsyncStack();

  await stack.pushAsync(1);
  await stack.pushAsync(2);
  await stack.pushAsync(3);

  for (const value of stack) {
    print("Sync Iteration:", value);
  }

  print("Pop:", await stack.popAsync());

  for await (const value of stack.asyncReverseIterator()) {
    print("Async Reverse Iteration:", value);
  }
})();
