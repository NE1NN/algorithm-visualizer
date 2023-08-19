import {rows, cols} from '../PathfindingVisualizer/PathfindingVisualizer';

export function dfs(grid, startNode, setGrid, delay) {
  const stack = [grid[startNode[0]][startNode[1]]];
  let i = 0;
  const intervalId = setInterval(() => {
    if (i >= stack.length) {
      clearInterval(intervalId);
      setGrid([...grid]);
      return;
    }
    const node = stack[i];
    if (!node.isVisited) {
      node.isVisited = true;
      for (const neighbor of getNeighbors(grid, node)) {
        stack.push(neighbor);
      }
    }
    i++;
    setGrid([...grid]);
  }, delay);
}

function getNeighbors(grid, node) {
  const {row, col} = node;
  const neighbors = [];
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < rows - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < cols - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}