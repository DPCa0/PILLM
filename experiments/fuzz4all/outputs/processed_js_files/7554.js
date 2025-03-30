class Maze {
  constructor(size) {
    this.size = size;
    this.grid = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => (Math.random() > 0.7 ? '#' : '.'))
    );
    this.grid[0][0] = 'S';  
    this.grid[size - 1][size - 1] = 'E';  
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        yield [i, j, this.grid[i][j]];
      }
    }
  }

  async solve() {
    const path = [];
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    
    const dfs = async (x, y) => {
      if (x === this.size - 1 && y === this.size - 1) {
        print('Path found:', path);
        return true;
      }
      for (const [dx, dy] of directions) {
        const [nx, ny] = [x + dx, y + dy];
        if (
          nx >= 0 && ny >= 0 && nx < this.size && ny < this.size &&
          (this.grid[nx][ny] === '.' || this.grid[nx][ny] === 'E')
        ) {
          this.grid[nx][ny] = '*';  
          path.push([nx, ny]);
          if (await dfs(nx, ny)) return true;
          path.pop();
          this.grid[nx][ny] = '.';  
        }
      }
      return false;
    };

    await dfs(0, 0);
    this.print();
  }

  print() {
    this.grid.forEach(row => print(row.join(' ')));
  }
}

(async () => {
  const maze = new Maze(10);
  print('Maze:');
  maze.print();
  print('\nSolving...');
  await maze.solve();
})();
