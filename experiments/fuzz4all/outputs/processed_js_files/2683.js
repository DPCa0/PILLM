class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  *[Symbol.iterator]() {
    let [a, b, index] = [0, 1, 0];
    while (index < this.limit) {
      yield a;
      [a, b] = [b, a + b];
      this.memo.set(index, a);
      index++;
    }
  }

  getNthNumber(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    return this.calculateNthNumber(n);
  }

  calculateNthNumber(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    const result = this.calculateNthNumber(n - 1) + this.calculateNthNumber(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const seqLimit = 10;
const fibSeq = new FibonacciSequence(seqLimit);

print(`Fibonacci Sequence up to ${seqLimit}:`);
for (const num of fibSeq) {
  print(num);
}

const nth = 7;
print(`The ${nth}th Fibonacci number is: ${fibSeq.getNthNumber(nth)}`);
